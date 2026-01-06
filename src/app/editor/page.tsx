'use client';

import { Suspense, useCallback, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Link from 'next/link';
import { useEmailState, BlockType, blockLabels } from '@/lib/email-state';
import { BlockPalette } from '@/components/editor/BlockPalette';
import { EmailCanvas } from '@/components/editor/EmailCanvas';
import { BlockSettings } from '@/components/editor/BlockSettings';
import { generateEmailHTML } from '@/lib/generate-html';
import { templates, getTemplate } from '@/lib/designs';

function EditorContent() {
  const {
    state,
    addBlock,
    removeBlock,
    updateBlock,
    reorderBlocks,
    selectBlock,
    duplicateBlock,
    setTheme,
    setPreheader,
    getSelectedBlock,
    loadState,
    clearBlocks,
  } = useEmailState();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Lower distance for more responsive dragging
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // If dragging from palette
    const activeData = active.data.current;
    if (activeData?.fromPalette) {
      const blockType = activeData.type as BlockType;
      // If dropped on a specific block, insert before it, otherwise append
      if (over.id !== 'email-canvas') {
        const targetIndex = state.blocks.findIndex((b) => b.id === over.id);
        if (targetIndex !== -1) {
          addBlock(blockType, targetIndex);
        } else {
          addBlock(blockType);
        }
      } else {
        addBlock(blockType);
      }
      return;
    }

    // If reordering within canvas - allow moving between any blocks
    if (active.id !== over.id && over.id !== 'email-canvas') {
      const oldIndex = state.blocks.findIndex((b) => b.id === active.id);
      const newIndex = state.blocks.findIndex((b) => b.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(
          state.blocks.map((b) => b.id),
          oldIndex,
          newIndex
        );
        reorderBlocks(newOrder);
      }
    }
  };

  // Image upload handler - now uses server upload
  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  }, []);

  // Copy HTML to clipboard
  const handleCopyHTML = async () => {
    const html = generateEmailHTML(state);
    await navigator.clipboard.writeText(html);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Download HTML file
  const handleDownloadHTML = () => {
    const html = generateEmailHTML(state);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Load template - makes it fully editable
  const handleLoadTemplate = (templateId: string) => {
    const template = getTemplate(templateId);
    if (template) {
      if (state.blocks.length > 0) {
        if (confirm('Načtení šablony smaže aktuální email. Pokračovat?')) {
          // Deep clone the template state to make it fully editable
          const editableState = {
            ...template.state,
            blocks: template.state.blocks.map(block => ({
              ...block,
              id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${block.id}`,
              data: { ...block.data },
            })),
          };
          loadState(editableState);
          setShowTemplates(false);
        }
      } else {
        // Deep clone the template state to make it fully editable
        const editableState = {
          ...template.state,
          blocks: template.state.blocks.map(block => ({
            ...block,
            id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${block.id}`,
            data: { ...block.data },
          })),
        };
        loadState(editableState);
        setShowTemplates(false);
      }
    }
  };

  const selectedBlock = getSelectedBlock();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-gray-900">
              📧 Email Builder
            </Link>
            <span className="text-sm text-gray-500">
              {state.blocks.length} bloků
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                📄 Šablony
              </button>
              {showTemplates && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 px-2 py-1 mb-1">
                      Dostupné šablony
                    </div>
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleLoadTemplate(template.id)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      >
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-gray-500">{template.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleCopyHTML}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                copySuccess
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {copySuccess ? '✓ Zkopírováno!' : '📋 Kopírovat HTML'}
            </button>
            <button
              onClick={handleDownloadHTML}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              ⬇️ Stáhnout HTML
            </button>
            <Link
              href="/tips"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              💡 Tipy
            </Link>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          <BlockPalette onAddBlock={addBlock} />
          
          <EmailCanvas
            state={state}
            onSelectBlock={selectBlock}
            onRemoveBlock={removeBlock}
            onDuplicateBlock={duplicateBlock}
          />
          
          <BlockSettings
            block={selectedBlock}
            preheader={state.preheader}
            currentTheme={state.theme}
            onUpdateBlock={updateBlock}
            onUpdatePreheader={setPreheader}
            onUpdateTheme={setTheme}
            onImageUpload={handleImageUpload}
          />
        </div>
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeId && activeId.startsWith('palette-') && (
          <div className="bg-white p-3 rounded-lg shadow-lg border border-pink-300 flex items-center gap-2">
            <span className="text-xl">
              {blockLabels[activeId.replace('palette-', '') as BlockType]?.icon}
            </span>
            <span className="font-medium text-gray-900">
              {blockLabels[activeId.replace('palette-', '') as BlockType]?.name}
            </span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Načítám editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
