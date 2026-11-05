import {
  BookOpen,
  Coffee,
  Cookie,
  Droplets,
  Flame,
  Home,
  Milk,
  PenTool,
  Scissors,
  ShieldCheck,
  Sparkles,
  Wheat
} from 'lucide-react';
import React from 'react';
import { useNav } from '../../context/NavigationContext';

interface CategoryItem {
  id: string;
  categoryId: 'groceries' | 'cosmetics' | 'stationery' | 'home-essentials';
  subcategory: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  iconColor: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: 'c-atta',
    categoryId: 'groceries',
    subcategory: 'Atta, Rice & Dal',
    label: 'Atta & Rice',
    icon: Wheat,
    bgColor: 'bg-amber-100/80',
    iconColor: 'text-[#C2570C]'
  },
  {
    id: 'c-oils',
    categoryId: 'groceries',
    subcategory: 'Cooking Oils & Ghee',
    label: 'Oils & Ghee',
    icon: Droplets,
    bgColor: 'bg-orange-100/80',
    iconColor: 'text-[#E8890C]'
  },
  {
    id: 'c-masala',
    categoryId: 'groceries',
    subcategory: 'Spices & Masala',
    label: 'Masala & Salt',
    icon: Flame,
    bgColor: 'bg-red-100/80',
    iconColor: 'text-[#B91C1C]'
  },
  {
    id: 'c-snacks',
    categoryId: 'groceries',
    subcategory: 'Snacks & Biscuits',
    label: 'Snacks & Biscuits',
    icon: Cookie,
    bgColor: 'bg-amber-100/70',
    iconColor: 'text-[#D97706]'
  },
  {
    id: 'c-beverages',
    categoryId: 'groceries',
    subcategory: 'Tea, Coffee & Beverages',
    label: 'Tea & Coffee',
    icon: Coffee,
    bgColor: 'bg-stone-200/80',
    iconColor: 'text-[#78350F]'
  },
  {
    id: 'c-dairy',
    categoryId: 'groceries',
    subcategory: 'Dairy & Breakfast',
    label: 'Dairy & Butter',
    icon: Milk,
    bgColor: 'bg-yellow-100/80',
    iconColor: 'text-[#B45309]'
  },
  {
    id: 'c-skincare',
    categoryId: 'cosmetics',
    subcategory: 'Face Care & Serums',
    label: 'Skin Care',
    icon: Sparkles,
    bgColor: 'bg-rose-100/80',
    iconColor: 'text-[#BE185D]'
  },
  {
    id: 'c-haircare',
    categoryId: 'cosmetics',
    subcategory: 'Hair Care & Shampoos',
    label: 'Hair Care',
    icon: Scissors,
    bgColor: 'bg-purple-100/80',
    iconColor: 'text-[#7C3AED]'
  },
  {
    id: 'c-stationery',
    categoryId: 'stationery',
    subcategory: 'Pens & Writing',
    label: 'Pens & Writing',
    icon: PenTool,
    bgColor: 'bg-blue-100/80',
    iconColor: 'text-[#1D4ED8]'
  },
  {
    id: 'c-notebooks',
    categoryId: 'stationery',
    subcategory: 'Notebooks & Registers',
    label: 'Notebooks',
    icon: BookOpen,
    bgColor: 'bg-emerald-100/80',
    iconColor: 'text-[#047857]'
  },
  {
    id: 'c-cleaning',
    categoryId: 'home-essentials',
    subcategory: 'Cleaners & Disinfectants',
    label: 'Cleaning',
    icon: ShieldCheck,
    bgColor: 'bg-teal-100/80',
    iconColor: 'text-[#0F766E]'
  },
  {
    id: 'c-home',
    categoryId: 'home-essentials',
    subcategory: 'Kitchen Utensils & Mops',
    label: 'Kitchen & Home',
    icon: Home,
    bgColor: 'bg-amber-100/80',
    iconColor: 'text-[#92400E]'
  }
];

export const CategoryGrid: React.FC = () => {
  const { navigateTo } = useNav();

  const handleSelect = (item: CategoryItem) => {
    navigateTo('category', { category: item.categoryId, subcategory: item.subcategory });
  };

  return (
    <section className="my-5">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base sm:text-lg font-bold text-[#1B1209]">
          Shop by Category
        </h2>
        <button
          type="button"
          onClick={() => {
            navigateTo('category', { category: 'all' });
          }}
          className="text-xs sm:text-sm font-semibold text-[#C2570C] hover:text-[#9E3F05] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Grid: 4 per row mobile, 6 on tablet, 8 to 12 on desktop */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2.5 sm:gap-3">
        {CATEGORY_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className="group flex flex-col items-center text-center p-2 rounded-xl bg-white border border-[#EADBCE]/60 shadow-[0_1px_4px_rgba(27,18,9,0.03)] hover:shadow-md hover:border-[#E8890C]/50 active:scale-95 transition-all"
            >
              <div
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl ${item.bgColor} flex items-center justify-center transition-transform group-hover:scale-110 mb-1.5`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor}`} />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-[#1B1209] group-hover:text-[#C2570C] leading-tight line-clamp-2">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
