import { Download, Smartphone } from 'lucide-react';
import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, hide
  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#C2570C] to-[#E8890C] text-white font-bold text-xs shadow-xs hover:brightness-105 active:scale-95 transition-all ${
          compact ? 'px-2.5 py-1.5' : 'px-3.5 py-2'
        }`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-1.5 rounded-lg border border-[#F5B718] bg-[#FFF8EC] text-[#C2570C] font-semibold text-xs hover:bg-[#FDEBD2] active:scale-95 transition-all ${
            compact ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Add to Phone</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200">
              <div className="flex items-center gap-2 mb-3 text-[#1B1209]">
                <Smartphone className="w-5 h-5 text-[#C2570C]" />
                <h3 className="text-base font-bold">Install Ajota Mart on iPhone</h3>
              </div>
              <p className="text-xs text-stone-600 space-y-2 leading-relaxed">
                <span>1. Tap the <strong>Share</strong> button (box with arrow) at the bottom of Safari.</span><br />
                <span>2. Scroll down and select <strong>Add to Home Screen</strong>.</span><br />
                <span>3. Tap <strong>Add</strong> to shop faster with 1-tap from your home screen!</span>
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#C2570C] text-white py-2 text-xs font-bold hover:bg-[#9E3F05] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
