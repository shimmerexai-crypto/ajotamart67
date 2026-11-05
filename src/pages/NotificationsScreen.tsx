import { ArrowLeft, Bell, CheckCheck, Sparkles, Tag, Trash2, Truck } from 'lucide-react';
import React, { useState } from 'react';
import { useNav } from '../context/NavigationContext';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  iconType: 'truck' | 'offer' | 'bell';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Order Dispatched from Badla Road Mart',
    message: 'Your order is packed and on the way for local delivery in Jodhpur.',
    time: '2 hours ago',
    iconType: 'truck',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Diwali Grocery Mahabachat is Live!',
    message: 'Get up to 40% OFF on Atta, Desi Ghee, Basmati Rice and MDH Spices.',
    time: '1 day ago',
    iconType: 'offer',
    read: false
  },
  {
    id: 'notif-3',
    title: 'New Classmate Stationery in Stock',
    message: 'Fresh stock of Classmate 6-subject spiral notebooks and long registers arrived.',
    time: '3 days ago',
    iconType: 'bell',
    read: true
  }
];

export const NotificationsScreen: React.FC = () => {
  const { goBack, showToast } = useNav();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const clearAll = () => {
    setNotifications([]);
    showToast('Notifications cleared');
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
              Notifications & Updates
            </h1>
            <p className="text-xs text-stone-500">Order alerts and local store offers</p>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs font-bold text-[#C2570C] hover:underline"
            >
              Mark Read
            </button>
            <span className="text-stone-300">·</span>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-stone-400 hover:text-red-600"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-[#EADBCE] dark:border-stone-800 p-8 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mx-auto mb-3">
            <Bell className="w-7 h-7" />
          </div>
          <h2 className="text-sm font-bold text-[#1B1209] dark:text-white">
            No New Notifications
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            You're all caught up with your Ajota Mart updates!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => {
            return (
              <div
                key={n.id}
                className={`p-4 rounded-3xl border transition-all flex items-start gap-3.5 ${
                  !n.read
                    ? 'bg-[#FFFDF9] dark:bg-stone-900 border-[#F5B718]/50 shadow-2xs'
                    : 'bg-white dark:bg-[#1A120B] border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFF8EC] dark:bg-stone-800 text-[#C2570C] flex items-center justify-center shrink-0 mt-0.5">
                  {n.iconType === 'truck' ? (
                    <Truck className="w-4 h-4" />
                  ) : n.iconType === 'offer' ? (
                    <Tag className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Bell className="w-4 h-4 text-purple-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-[#1B1209] dark:text-white truncate">
                      {n.title}
                    </h3>
                    <span className="text-[10px] text-stone-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
