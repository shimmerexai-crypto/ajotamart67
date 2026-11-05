import React from 'react';

interface AjotaLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export const AjotaLogo: React.FC<AjotaLogoProps> = ({
  size = 40,
  showText = false,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Exact Logo Image with Gold Octagon, AM & Shopping Cart */}
      <img
        src="/logo.svg"
        alt="Ajota Mart Logo"
        width={size}
        height={size}
        className="rounded-full shadow-sm object-contain shrink-0 transition-transform active:scale-95"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-extrabold tracking-tight text-lg sm:text-xl text-[#1B1209]">
            Ajota<span className="text-[#C2570C]">Mart</span>
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-[#9E3F05] uppercase">
            Jodhpur's Mart
          </span>
        </div>
      )}
    </div>
  );
};
