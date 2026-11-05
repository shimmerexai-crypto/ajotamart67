import { ArrowLeft, Check, Edit3, MapPin, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useAddress } from '../context/AddressContext';
import { useNav } from '../context/NavigationContext';
import { Address } from '../types/store';

export const AddressesScreen: React.FC = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress, isPincodeServiceable } = useAddress();
  const { goBack, showToast } = useNav();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: 'Home' as 'Home' | 'Work' | 'Other',
    name: 'Suresh Choudhary',
    phone: '+91 98290 54321',
    street: '',
    landmark: '',
    area: 'Badla Road',
    city: 'Jodhpur',
    pincode: '342008'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.street.trim()) {
      showToast('Please enter your house or street address');
      return;
    }
    if (!isPincodeServiceable(form.pincode)) {
      showToast(`Pincode ${form.pincode} is not currently serviceable in Jodhpur`);
      return;
    }

    if (editingId) {
      updateAddress(editingId, form);
      showToast('Address updated successfully');
      setEditingId(null);
    } else {
      addAddress({ ...form, isDefault: addresses.length === 0 });
      showToast('New address saved');
      setIsAdding(false);
    }
  };

  const startEdit = (addr: Address) => {
    setEditingId(addr.id);
    setForm({
      title: addr.title,
      name: addr.name,
      phone: addr.phone,
      street: addr.street,
      landmark: addr.landmark || '',
      area: addr.area,
      city: addr.city,
      pincode: addr.pincode
    });
    setIsAdding(true);
  };

  return (
    <div className="w-full pb-16 max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2 border-b border-[#EADBCE] dark:border-stone-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-[#1B1209] dark:text-white">
              Saved Addresses in Jodhpur
            </h1>
            <p className="text-xs text-stone-500">Manage delivery locations</p>
          </div>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                title: 'Home',
                name: 'Suresh Choudhary',
                phone: '+91 98290 54321',
                street: '',
                landmark: '',
                area: 'Badla Road',
                city: 'Jodhpur',
                pincode: '342008'
              });
              setIsAdding(true);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#C2570C] text-white text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New</span>
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-xs">
          <h2 className="text-sm font-black text-[#1B1209] dark:text-white mb-3">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h2>

          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Address Tag
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Home', 'Work', 'Other'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, title: t }))}
                    className={`py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      form.title === t
                        ? 'bg-[#1B1209] text-white border-[#1B1209]'
                        : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                House / Flat / Street Details *
              </label>
              <input
                type="text"
                required
                value={form.street}
                onChange={(e) => setForm(p => ({ ...p, street: e.target.value }))}
                placeholder="Plot / House number, Colony, Badla Road"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={form.landmark}
                  onChange={(e) => setForm(p => ({ ...p, landmark: e.target.value }))}
                  placeholder="Near Samarpan Circle"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Pincode (Jodhpur) *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => setForm(p => ({ ...p, pincode: e.target.value }))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#C2570C] text-white text-xs font-bold shadow-xs active:scale-95"
              >
                Save Address
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map(addr => (
            <div
              key={addr.id}
              className="p-4 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF8EC] dark:bg-stone-800 text-[#C2570C] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1B1209] dark:text-white">
                      {addr.title}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold bg-[#15803D] text-white px-2 py-0.2 rounded-full">
                        Default
                      </span>
                    )}
                    <span className="text-[10px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-600 px-1.5 py-0.2 rounded">
                      {addr.pincode}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-snug">
                    {addr.street}, {addr.landmark ? `${addr.landmark}, ` : ''}{addr.area}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {addr.name} ({addr.phone})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[11px] font-bold text-stone-500 hover:text-[#C2570C] px-2 py-1"
                  >
                    Set Default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => startEdit(addr)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-[#C2570C]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                {addresses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteAddress(addr.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
