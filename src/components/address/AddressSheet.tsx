import { Check, CheckCircle2, MapPin, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';
import { useAddress } from '../../context/AddressContext';
import { useNav } from '../../context/NavigationContext';

export const AddressSheet: React.FC = () => {
  const { isAddressSheetOpen, setIsAddressSheetOpen, showToast } = useNav();
  const { addresses, selectedAddress, setSelectedAddress, addAddress } = useAddress();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: 'Home' as 'Home' | 'Work' | 'Other',
    name: 'Jodhpur Resident',
    phone: '+91 98290 54321',
    street: '',
    landmark: '',
    area: 'Badla Road',
    city: 'Jodhpur',
    pincode: '342008'
  });

  if (!isAddressSheetOpen) return null;

  const isPincodeServiceable = STORE_CONFIG.serviceablePincodes.includes(formData.pincode.trim());

  const handleSelect = (addr: (typeof addresses)[0]) => {
    setSelectedAddress(addr);
    setIsAddressSheetOpen(false);
    showToast(`Delivering to ${addr.title} (${addr.pincode})`);
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.street.trim()) {
      showToast('Please enter your street address');
      return;
    }
    if (!isPincodeServiceable) {
      showToast(`Pincode ${formData.pincode} is outside Jodhpur delivery range`);
      return;
    }

    addAddress({
      ...formData,
      isDefault: false
    });
    setIsAddingNew(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in"
      onClick={() => setIsAddressSheetOpen(false)}
    >
      <div
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EADBCE]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C2570C]/10 flex items-center justify-center text-[#C2570C]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1B1209]">
                Select Delivery Location
              </h3>
              <p className="text-[11px] text-stone-500">
                Serviceable across Jodhpur from Badla Road store
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close address sheet"
            onClick={() => setIsAddressSheetOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-3 overflow-y-auto flex-1 space-y-3">
          {!isAddingNew ? (
            <>
              {/* Address Cards */}
              <div className="space-y-2.5">
                {addresses.map((addr) => {
                  const isSelected = selectedAddress.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => handleSelect(addr)}
                      className={`p-3 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FFF8EC] border-[#C2570C] shadow-xs'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5 ${
                            isSelected
                              ? 'bg-[#C2570C] text-white'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1B1209]">
                              {addr.title}
                            </span>
                            <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded font-mono">
                              {addr.pincode}
                            </span>
                          </div>
                          <p className="text-xs text-stone-700 mt-0.5 leading-snug">
                            {addr.street}, {addr.landmark ? `${addr.landmark}, ` : ''}{addr.area}
                          </p>
                          <p className="text-[10px] text-stone-500 mt-0.5">
                            Recipient: {addr.name} ({addr.phone})
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Address Button */}
              <button
                type="button"
                onClick={() => setIsAddingNew(true)}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-[#C2570C]/50 hover:border-[#C2570C] text-[#C2570C] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address in Jodhpur</span>
              </button>

              {/* Pincode info badge */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
                <span className="font-bold text-[#1B1209] block mb-1">
                  Active Serviceable Pincodes in Jodhpur:
                </span>
                <p className="text-[11px] leading-relaxed">
                  {STORE_CONFIG.serviceablePincodes.join(', ')} (Badla Road, Samarpan Area, Mandore, Sojati Gate, Ratanada, Shastri Nagar, etc.)
                </p>
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveNew} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1209]">
                  New Jodhpur Address
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-stone-500 hover:text-stone-700 underline"
                >
                  Cancel
                </button>
              </div>

              {/* Label type */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Address Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Home', 'Work', 'Other'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, title: t }))}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        formData.title === t
                          ? 'bg-[#1B1209] text-white border-[#1B1209]'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  House / Flat / Street Details *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 45, Near Samarpan Circle"
                  value={formData.street}
                  onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#C2570C] outline-none"
                />
              </div>

              {/* Landmark & Area */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Shiv Temple"
                    value={formData.landmark}
                    onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#C2570C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Area in Jodhpur
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#C2570C] outline-none"
                  />
                </div>
              </div>

              {/* Pincode & Validation */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Pincode (Jodhpur) *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#C2570C] outline-none font-mono"
                />
                <div className="mt-1">
                  {isPincodeServiceable ? (
                    <span className="text-[11px] font-bold text-[#15803D] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Fast local delivery available to this pincode!
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#B91C1C] font-semibold">
                      Please enter a valid Jodhpur pincode (e.g. 342008, 342001)
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!isPincodeServiceable}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] disabled:opacity-50 text-white font-bold text-xs shadow-md mt-2"
              >
                Save & Select Address
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
