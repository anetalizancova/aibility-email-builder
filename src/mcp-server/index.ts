/**
 * MCP Server for Email Builder
 * 
 * This MCP server provides functions for Cursor to interact with the Email Builder.
 * It allows creating emails, adding blocks, and generating HTML.
 * 
 * To use this in Cursor:
 * 1. Add this to your Cursor MCP settings
 * 2. The server will expose functions for email building
 * 
 * Note: This requires @modelcontextprotocol/sdk package
 * Install with: npm install @modelcontextprotocol/sdk
 */

// MCP SDK imports (commented out until package is installed)
// import { Server } from '@modelcontextprotocol/sdk/server/index.js';
// import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
// import {
//   CallToolRequestSchema,
//   ListToolsRequestSchema,
//   Tool,
// } from '@modelcontextprotocol/sdk/types.js';

// Import email builder functions
import { generateEmailHTML } from '../lib/generate-html';
import { EmailState, BlockType, getDefaultBlockData } from '../lib/email-state';
import { getTemplate, templates } from '../lib/designs';

// In-memory state (in production, this should be persisted)
let currentEmailState: EmailState = {
  blocks: [],
  selectedBlockId: null,
  theme: 'light-pink-blue',
  preheader: '',
};

// MCP Server implementation
// TODO: Uncomment when @modelcontextprotocol/sdk is installed
// const server = new Server(
//   {
//     name: 'email-builder',
//     version: '1.0.0',
//   },
//   {
//     capabilities: {
//       tools: {},
//     },
//   }
// );

// List available tools
// server.setRequestHandler(ListToolsRequestSchema, async () => {
export const mcpTools = [
      {
        name: 'create_email',
        description: 'Create a new email or load a template',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: {
              type: 'string',
              description: 'Template ID to load (newsletter, b2b) or null for empty email',
              enum: ['newsletter', 'b2b', null],
            },
          },
        },
      },
      {
        name: 'add_block',
        description: 'Add a new block to the email',
        inputSchema: {
          type: 'object',
          properties: {
            blockType: {
              type: 'string',
              description: 'Type of block to add',
              enum: [
                'greeting',
                'hero-image',
                'text-section',
                'gradient-box',
                'event-box',
                'use-case-bubble',
                'video-section',
                'cta-button',
                'image',
                'divider',
                'spacer',
                'footer',
              ],
            },
          },
          required: ['blockType'],
        },
      },
      {
        name: 'update_block',
        description: 'Update a block in the email',
        inputSchema: {
          type: 'object',
          properties: {
            blockId: {
              type: 'string',
              description: 'ID of the block to update',
            },
            data: {
              type: 'object',
              description: 'Partial block data to update',
            },
          },
          required: ['blockId', 'data'],
        },
      },
      {
        name: 'remove_block',
        description: 'Remove a block from the email',
        inputSchema: {
          type: 'object',
          properties: {
            blockId: {
              type: 'string',
              description: 'ID of the block to remove',
            },
          },
          required: ['blockId'],
        },
      },
      {
        name: 'generate_html',
        description: 'Generate HTML from the current email state',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_email_state',
        description: 'Get the current email state',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'list_templates',
        description: 'List available email templates',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ];
// });

// Handle tool calls
// server.setRequestHandler(CallToolRequestSchema, async (request) => {
export async function handleMcpToolCall(name: string, args: any) {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_email': {
        const { templateId } = (args || {}) as { templateId?: string };
        
        if (templateId) {
          const template = getTemplate(templateId);
          if (template) {
            currentEmailState = template.state;
            return {
              text: `Email created from template: ${template.name}`,
            };
          } else {
            throw new Error(`Template not found: ${templateId}`);
          }
        } else {
          currentEmailState = {
            blocks: [],
            selectedBlockId: null,
            theme: 'light-pink-blue',
            preheader: '',
          };
          return {
            text: 'Empty email created',
          };
        }
      }

      case 'add_block': {
        const { blockType } = (args || {}) as { blockType: BlockType };
        const newBlock = {
          id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: blockType,
          data: getDefaultBlockData(blockType),
        };
        currentEmailState.blocks.push(newBlock);
        return {
          text: `Block added: ${blockType}`,
        };
      }

      case 'update_block': {
        const { blockId, data } = (args || {}) as { blockId: string; data: Partial<any> };
        const block = currentEmailState.blocks.find(b => b.id === blockId);
        if (block) {
          block.data = { ...block.data, ...data };
          return {
            text: `Block updated: ${blockId}`,
          };
        } else {
          throw new Error(`Block not found: ${blockId}`);
        }
      }

      case 'remove_block': {
        const { blockId } = (args || {}) as { blockId: string };
        currentEmailState.blocks = currentEmailState.blocks.filter(b => b.id !== blockId);
        return {
          text: `Block removed: ${blockId}`,
        };
      }

      case 'generate_html': {
        const html = generateEmailHTML(currentEmailState);
        return {
          text: html,
        };
      }

      case 'get_email_state': {
        return {
          text: JSON.stringify(currentEmailState, null, 2),
        };
      }

      case 'list_templates': {
        const templateList = templates.map(t => ({
          id: t.id,
          name: t.name,
          description: t.description,
        }));
        return {
          text: JSON.stringify(templateList, null, 2),
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Start server (commented out until MCP SDK is installed)
// async function main() {
//   const transport = new StdioServerTransport();
//   await server.connect(transport);
//   console.error('Email Builder MCP server running on stdio');
// }
// main().catch(console.error);

