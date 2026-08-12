'use client';

import React, { useState } from 'react';

interface BlogImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

export default function BlogImage({ src, fallbackSrc, alt, className, ...props }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt || ''}
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
