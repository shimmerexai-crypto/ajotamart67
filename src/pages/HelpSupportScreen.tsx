import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useNav } from '../context/NavigationContext';

export const HelpSupportScreen: React.FC = () => {
  const { goBack, showToast } = useNav();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Report an issue state
  const [issueType, setIssueType] = useState('Missing / Damaged Item');
  const [issueNotes, setIssueNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => (prev === idx ? null : idx));
  };

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueNotes.trim()) {
      showToast('Please describe the issue with your order');
      return;
    }
    setSubmitted(true);
    showToast('Your issue has been reported. Badla Road store support will contact you.');
  };


  return (
    <div className="w-full pb-20 max-w-2xl mx-auto space-y-6">
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
            Help & Customer Support
          </h1>
          <p className="text-xs text-stone-500">Ajota Mart · Badla Road, Jodhpur</p>
        </div>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-3xl bg-[#15803D] hover:bg-[#16A34A] text-white flex flex-col items-center text-center gap-2 shadow-xs active:scale-95 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-black block">Chat on WhatsApp</span>
            <span className="text-[10px] text-white/80">Instant store responses</span>
          </div>
        </a>

        <a
          href={`tel:${STORE_CONFIG.phone}`}
          className="p-4 rounded-3xl bg-[#1B1209] hover:bg-[#331C0C] text-white flex flex-col items-center text-center gap-2 shadow-xs active:scale-95 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Phone className="w-5 h-5 text-[#FFE885]" />
          </div>
          <div>
            <span className="text-xs font-black block">Call Mart Team</span>
            <span className="text-[10px] text-[#FFE885]/80">{STORE_CONFIG.phoneDisplay}</span>
          </div>
        </a>
      </div>

      {/* FAQ Accordions */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-[#C2570C]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {STORE_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-xs text-[#1B1209] dark:text-white gap-2"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C2570C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed pr-4">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Report an Issue Form */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white mb-2">
          Report an Issue or Feedback
        </h2>
        <p className="text-xs text-stone-500 mb-4">
          Having an issue with an item, missing product, or delivery in Jodhpur? Let us know directly.
        </p>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 text-[#15803D] text-xs font-bold text-center">
            Thank you! Your ticket #TK-{Math.floor(1000 + Math.random() * 9000)} has been logged. Our store manager will call or message you shortly.
          </div>
        ) : (
          <form onSubmit={handleReportIssue} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Category of Issue
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
              >
                <option value="Missing / Damaged Item">Missing / Damaged Item</option>
                <option value="Delivery Delay">Delivery Delay / Query</option>
                <option value="Payment / Refund Issue">Payment / Refund Issue</option>
                <option value="Product Quality Feedback">Product Quality Feedback</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Describe the problem in detail
              </label>
              <textarea
                rows={3}
                required
                value={issueNotes}
                onChange={(e) => setIssueNotes(e.target.value)}
                placeholder="Mention order number and what happened..."
                className="w-full p-3 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#C2570C] hover:bg-[#A84805] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Issue to Store Team</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
