import { Star, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNav } from '../../context/NavigationContext';

interface RatingModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ orderId, isOpen, onClose }) => {
  const { showToast } = useNav();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`Thank you! Rating recorded for Order #${orderId}`);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-[#1A120B] rounded-3xl p-6 shadow-2xl border border-[#EADBCE] dark:border-[#382619]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-sm font-black text-[#1B1209] dark:text-white">
            Rate Your Badla Road Order
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 fill-[#15803D]" />
            </div>
            <p className="text-xs font-bold text-[#1B1209] dark:text-white">
              Thank you for supporting your local mart!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 active:scale-95 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-[#F5B718] text-[#F5B718]'
                        : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-center text-xs font-bold text-[#C2570C]">
              {rating === 5 ? 'Excellent Delivery & Quality!' : rating >= 4 ? 'Good Experience' : 'Needs Improvement'}
            </p>

            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Share details about packing or products (optional)
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Freshness, delivery rider behaviour, or packaging..."
                className="w-full p-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#C2570C] hover:bg-[#A84805] text-white text-xs font-bold shadow-md active:scale-95"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
