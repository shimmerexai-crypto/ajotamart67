import React, { useEffect, useState } from 'react';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { DealsOfTheDay } from '../components/home/DealsOfTheDay';
import { HeroSlider } from '../components/home/HeroSlider';
import { OfferStrip } from '../components/home/OfferStrip';
import { ProductShelf } from '../components/home/ProductShelf';
import { TrustStrip } from '../components/home/TrustStrip';
import { getOrders } from '../services/store';
import { Order, Product } from '../types/store';

interface HomeViewProps {
  products: Product[];
}

export const HomeView: React.FC<HomeViewProps> = ({ products }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setOrders).catch(() => setOrders([]));
  }, []);

  // Extract products for various shelves
  const bestSellers = products.filter(p => p.isBestSeller);
  const backToSchool = products.filter(p => p.isBackToSchool || p.category === 'stationery');
  const dailyKitchen = products.filter(
    p => p.isDailyEssential && (p.category === 'groceries' || p.category === 'home-essentials')
  );
  const personalCare = products.filter(p => p.category === 'cosmetics');

  // "Buy Again" extracted from user's previous orders
  const orderedProductIds = Array.from(
    new Set(orders.flatMap(o => o.items.map(i => i.productId)))
  );
  const buyAgainProducts = products.filter(p => orderedProductIds.includes(p.id));

  return (
    <div className="w-full">
      {/* 2. HERO SLIDER like Amazon Great Indian Festival */}
      <HeroSlider />

      {/* 3. Category Icon Grid (12 items) */}
      <CategoryGrid />

      {/* 4. Offer Strip with Free-Delivery Threshold & Payment options */}
      <OfferStrip />

      {/* 5. "Deals of the Day" with live countdown timer */}
      <DealsOfTheDay products={products} />

      {/* 6. Shelves */}
      {/* Buy Again (from past orders) */}
      {buyAgainProducts.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EADBCE]/80 shadow-2xs my-4">
          <ProductShelf
            title="Buy Again"
            subtitle="Frequently ordered items for your household"
            products={buyAgainProducts}
            categoryFilter="all"
            badge="Your Pantry"
          />
        </div>
      )}

      {/* Best Sellers */}
      <ProductShelf
        title="Best Sellers in Jodhpur"
        subtitle="Most ordered groceries and everyday essentials"
        products={bestSellers}
        categoryFilter="all"
        badge="Top Trending"
      />

      {/* Back to School */}
      <ProductShelf
        title="Back to School & Coaching Mart"
        subtitle="Registers, Classmate notebooks, pens & student stationery"
        products={backToSchool}
        categoryFilter="stationery"
        badge="Student Special"
      />

      {/* Daily Kitchen Essentials */}
      <ProductShelf
        title="Daily Kitchen Essentials"
        subtitle="Atta, Cooking Oils, Desi Ghee, Salt & Spices"
        products={dailyKitchen}
        categoryFilter="groceries"
        badge="Fresh Staples"
      />

      {/* Skin & Personal Care */}
      <ProductShelf
        title="Skin & Hair Care Fest"
        subtitle="Moisturisers, shampoos, soaps and body sprays"
        products={personalCare}
        categoryFilter="cosmetics"
        badge="Glow Care"
      />

      {/* 7. Trust Strip */}
      <TrustStrip />
    </div>
  );
};
