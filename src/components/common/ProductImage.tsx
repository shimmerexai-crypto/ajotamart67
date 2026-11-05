import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // default 'aspect-square'
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-square'
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Extract first letter for safe fallback
  const firstLetter = (alt.trim()[0] || 'A').toUpperCase();

  return (
    <div
      className={`relative w-full ${aspectRatio} bg-white overflow-hidden flex items-center justify-center p-2 rounded-lg ${className}`}
    >
      {/* Skeleton Shimmer while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-shimmer rounded-lg" />
      )}

      {/* Fallback container if image fails to load */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF8EC] to-[#F5EAD9] p-2 text-center select-none">
          <div className="w-12 h-12 rounded-full bg-[#E8890C]/15 flex items-center justify-center text-[#C2570C] font-bold text-xl border border-[#F5B718]/40 mb-1">
            {firstLetter}
          </div>
          <span className="text-[10px] font-medium text-[#785E4D] line-clamp-1 max-w-[90%]">
            {alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
