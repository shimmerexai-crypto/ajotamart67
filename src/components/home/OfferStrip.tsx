import { Banknote, QrCode, Sparkles, Truck } from 'lucide-react';
import React from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';

export const OfferStrip: React.FC = () => {
  return (
    <div className="my-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-[#FFF8EC] via-[#FDF3E3] to-[#FFF8EC] border border-[#F5B718]/40 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 items-center">
        {/* Free Delivery Perk */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C2570C]/10 flex items-center justify-center text-[#C2570C] shrink-0 border border-[#C2570C]/20">
            <Truck className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-[#1B1209]">
                Free Delivery Above ₹{STORE_CONFIG.freeDeliveryThreshold}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E8890C] fill-[#E8890C]" />
            </div>
            <p className="text-[11px] text-[#7A5B45]">
              Dispatched directly from Badla Road store
            </p>
          </div>
        </div>

        {/* UPI Payments */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#15803D]/10 flex items-center justify-center text-[#15803D] shrink-0 border border-[#15803D]/20">
            <QrCode className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="text-xs sm:text-sm font-bold text-[#1B1209]">
              Instant UPI & QR Code
            </span>
            <p className="text-[11px] text-[#7A5B45]">
              GPay, PhonePe, Paytm or Netbanking
            </p>
          </div>
        </div>

        {/* Cash on Delivery */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E8890C]/10 flex items-center justify-center text-[#E8890C] shrink-0 border border-[#E8890C]/20">
            <Banknote className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="text-xs sm:text-sm font-bold text-[#1B1209]">
              Cash on Delivery (COD)
            </span>
            <p className="text-[11px] text-[#7A5B45]">
              Pay in cash at doorstep upon inspection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
