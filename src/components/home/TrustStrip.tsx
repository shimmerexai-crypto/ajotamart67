import { BadgePercent, HeartHandshake, MapPin, RotateCcw, ShieldCheck } from 'lucide-react';
import React from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BadgePercent,
  ShieldCheck,
  RotateCcw,
  MapPin,
  HeartHandshake
};

export const TrustStrip: React.FC = () => {
  return (
    <section className="my-8 py-6 px-4 rounded-2xl bg-[#FFF8EC] border border-[#EADBCE] text-center">
      <div className="max-w-3xl mx-auto">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#C2570C]">
          The Badla Road Promise
        </span>
        <h3 className="text-sm sm:text-base md:text-lg font-black text-[#1B1209] mt-1 mb-1">
          Best prices · Genuine products · Easy returns · Local store you trust
        </h3>
        <p className="text-xs text-[#7A604D] mb-5 max-w-xl mx-auto">
          Proudly serving homes, families and students across Jodhpur from our Badla Road store with handpicked quality.
        </p>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          {STORE_CONFIG.trustBadges.map((badge, idx) => {
            const Icon = ICON_MAP[badge.iconName] || ShieldCheck;
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/80 border border-[#EADBCE]/60 flex flex-col gap-1.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F5B718]/20 flex items-center justify-center text-[#C2570C]">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1B1209]">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-[#785E4C] leading-snug">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
