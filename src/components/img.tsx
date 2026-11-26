'use client';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
/** Every picture slot goes through here, so a missing or replaced file can never leave a broken gap. */
export function Pic({ alt, className = '', ...p }: ImageProps) {
  const [bad, setBad] = useState(false);
  if (bad || !p.src) return <span role="img" aria-label={alt} className={`buti block bg-cream ${p.fill ? 'absolute inset-0 size-full' : 'size-full'}`} />;
  return <Image {...p} alt={alt} className={className} onError={() => setBad(true)} />;
}
