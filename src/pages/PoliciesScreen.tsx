import { ArrowLeft, RotateCcw, Shield, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useNav } from '../context/NavigationContext';

export const PoliciesScreen: React.FC = () => {
  const { goBack } = useNav();
  const [activeTab, setActiveTab] = useState<'returns' | 'cancellation' | 'privacy' | 'terms'>('returns');

  return (
    <div className="w-full pb-20 max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 py-2 border-b border-[#EADBCE] dark:border-stone-800">
        <button
          type="button"
          onClick={goBack}
          className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-black text-[#1B1209] dark:text-white">
            Store Policies & Terms
          </h1>
          <p className="text-xs text-stone-500">Ajota Mart · Badla Road, Jodhpur</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl overflow-x-auto no-scrollbar">
        {[
          { id: 'returns', label: 'Returns & Refund' },
          { id: 'cancellation', label: 'Cancellation' },
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms & Conditions' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-stone-800 text-[#1B1209] dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Policy Content Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs space-y-4 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
        {activeTab === 'returns' && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#15803D]">
              <RotateCcw className="w-5 h-5" />
              <h2 className="text-sm font-black text-[#1B1209] dark:text-white">
                Refund & Return Policy
              </h2>
            </div>
            <p className="mb-3">{STORE_CONFIG.policies.returns}</p>
            <h3 className="font-bold text-[#1B1209] dark:text-white mt-4 mb-1">
              Eligible Return Scenarios:
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600 dark:text-stone-400">
              <li>Packaging torn or leaking upon delivery.</li>
              <li>Incorrect product variant or pack size delivered.</li>
              <li>Product past expiry or best-before date.</li>
              <li>Defective stationery or writing items (e.g., pen ink dried).</li>
            </ul>
            <p className="mt-4 text-[11px] text-stone-500">
              Refunds for UPI payments are credited within 2–4 hours. Cash on delivery refunds can be collected at our Badla Road store or credited via UPI transfer.
            </p>
          </div>
        )}

        {activeTab === 'cancellation' && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#C2570C]">
              <Shield className="w-5 h-5" />
              <h2 className="text-sm font-black text-[#1B1209] dark:text-white">
                Order Cancellation Policy
              </h2>
            </div>
            <p className="mb-3">{STORE_CONFIG.policies.cancellation}</p>
            <h3 className="font-bold text-[#1B1209] dark:text-white mt-4 mb-1">
              Cancellation Steps:
            </h3>
            <p>
              Navigate to <strong>My Orders → Order Details</strong> and click the "Cancel Order" button while the order is in <em>Order Placed</em> state. If the order has already moved to <em>Packing at Mart</em>, please contact our Badla Road WhatsApp support directly.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-purple-600">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-sm font-black text-[#1B1209] dark:text-white">
                Privacy & Data Security
              </h2>
            </div>
            <p className="mb-3">{STORE_CONFIG.policies.privacy}</p>
            <p className="mb-2">
              We collect your phone number and delivery location exclusively to process your local orders in Jodhpur, send SMS receipts, and dispatch delivery partners from our Badla Road store.
            </p>
            <p className="text-[11px] text-stone-500">
              Your contact details are never rented or sold to external advertisers.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#E8890C]">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-sm font-black text-[#1B1209] dark:text-white">
                Terms & Conditions of Service
              </h2>
            </div>
            <p className="mb-3">{STORE_CONFIG.policies.terms}</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600 dark:text-stone-400">
              <li>Prices displayed in Indian Rupees (₹) are subject to real-time physical store availability at Badla Road.</li>
              <li>Free delivery threshold of ₹{STORE_CONFIG.freeDeliveryThreshold} applies automatically to eligible cart items.</li>
              <li>Delivery is restricted to verified Jodhpur pincodes ({STORE_CONFIG.serviceablePincodes.join(', ')}).</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
