'use client';

interface HeroImageProps {
  src: string;
  alt: string;
}

export function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <div className="w-full">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block"
      />
    </div>
  );
}

// HTML Export
export function heroImageToHTML(props: HeroImageProps): string {
  const { src, alt } = props;
  
  return `<tr>
  <td style="padding:0; background-color:#ffffff;">
    <img 
      src="${src}" 
      alt="${alt}" 
      width="600" 
      style="width:100%; max-width:600px; height:auto; display:block;" 
    />
  </td>
</tr>`;
}




