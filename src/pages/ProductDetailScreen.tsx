import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Truck
} from 'lucide-react';
import React, { useState } from 'react';
import { ProductImage } from '../components/common/ProductImage';
import { ProductShelf } from '../components/home/ProductShelf';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';
import { useNav } from '../context/NavigationContext';
import { useWishlist } from '../context/WishlistContext';
import { Product, ProductVariant } from '../types/store';
import { formatINR } from '../utils/formatters';

interface ProductDetailScreenProps {
  products: Product[];
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ products }) => {
  const { selectedProductId, goBack, showToast } = useNav();
  const { addToCart, decrementQuantity, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Accordion toggle states
  const [openSection, setOpenSection] = useState<'highlights' | 'desc' | 'ingredients' | 'shelf' | 'manufacturer' | null>(
    'highlights'
  );

  if (!product) return null;

  const currentVariant = selectedVariant || (product.variants?.[0] ?? null);
  const price = currentVariant ? currentVariant.price : product.price;
  const mrp = currentVariant ? currentVariant.mrp : product.mrp;
  const savings = Math.max(0, mrp - price);
  const discountPercent = Math.round((savings / mrp) * 100);
  const qty = getItemQuantity(product.id, currentVariant?.id);
  const inWishlist = isInWishlist(product.id);

  // Similar products in same category
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  const toggleAccordion = (section: typeof openSection) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Buy ${product.name} from Ajota Mart Jodhpur at ${formatINR(price)}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="w-full pb-28 md:pb-12">
      {/* Back and Breadcrumbs */}
      <div className="flex items-center justify-between py-2 mb-3">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-[#C2570C]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-[#C2570C]"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-[#C2570C]"
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C2570C] text-[#C2570C]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main 2-Column Desktop Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 bg-white dark:bg-[#1A120B] p-4 sm:p-6 rounded-3xl border border-[#EADBCE] dark:border-[#382619] shadow-sm mb-8">
        {/* Left: Gallery */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[380px] bg-[#FFFDF9] dark:bg-stone-900 rounded-2xl border border-[#EADBCE] dark:border-stone-800 p-4 flex items-center justify-center overflow-hidden">
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 z-10 bg-[#B91C1C] text-white text-xs font-black px-2.5 py-0.5 rounded shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
            <ProductImage src={product.images[activeImageIndex] || product.images[0]} alt={product.name} />
          </div>

          {/* Badges strip under image */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-[380px] mt-4 text-[11px] text-stone-600 dark:text-stone-300">
            <div className="p-2.5 rounded-xl bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/40 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C2570C] shrink-0" />
              <span className="leading-tight font-medium">Fast Local Delivery in Jodhpur</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/40 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" />
              <span className="leading-tight font-medium">100% Genuine Badla Road Stock</span>
            </div>
          </div>
        </div>

        {/* Right: Purchase & Details */}
        <div className="flex flex-col">
          <span className="text-xs font-extrabold uppercase text-[#C2570C] tracking-wider">
            {product.brand} · {product.categoryLabel}
          </span>
          <h1 className="text-lg sm:text-2xl font-black text-[#1B1209] dark:text-[#F3ECE2] mt-1 leading-snug">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 bg-[#15803D] text-white text-xs font-bold px-2 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-white" />
            </div>
            <span className="text-xs text-stone-500">
              {product.reviewCount} Verified Ratings in Jodhpur
            </span>
          </div>

          {/* Price Block with "You save ₹X" */}
          <div className="my-4 p-4 rounded-2xl bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/40 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-[#1B1209] dark:text-white tabular-nums">
                  {formatINR(price)}
                </span>
                {mrp > price && (
                  <span className="text-sm text-stone-500 line-through tabular-nums">
                    {formatINR(mrp)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Inclusive of all taxes · Cash on Delivery available
              </p>
            </div>

            {savings > 0 && (
              <div className="text-right">
                <span className="inline-block bg-[#B91C1C] text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-2xs">
                  You save {formatINR(savings)}
                </span>
              </div>
            )}
          </div>

          {/* Pack size chips */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-5">
              <label className="block text-xs font-bold text-[#1B1209] dark:text-[#F3ECE2] uppercase mb-2">
                Select Pack Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v => {
                  const isSelected = (currentVariant?.id || product.variants[0]?.id) === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-[#1B1209] text-white border-[#1B1209] shadow-xs'
                          : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-[#C2570C]'
                      }`}
                    >
                      {v.name} · {formatINR(v.price)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Desktop Add to Cart / Stepper */}
          <div className="hidden md:flex items-center gap-3 mb-6">
            {!product.inStock ? (
              <button
                type="button"
                disabled
                className="w-full py-3 rounded-2xl bg-stone-200 text-stone-400 font-bold text-sm"
              >
                Currently Out of Stock
              </button>
            ) : qty === 0 ? (
              <button
                type="button"
                onClick={() => addToCart(product, currentVariant || undefined)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>ADD TO CART · {formatINR(price)}</span>
              </button>
            ) : (
              <div className="flex items-center justify-between w-full p-2 rounded-2xl bg-[#FFF8EC] border-2 border-[#C2570C]">
                <span className="text-xs font-bold text-[#C2570C] pl-2">
                  Item added in cart
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => decrementQuantity(product.id, currentVariant?.id)}
                    className="w-9 h-9 rounded-xl bg-white border border-[#C2570C] text-[#C2570C] flex items-center justify-center font-black active:scale-90"
                  >
                    <Minus className="w-4 h-4 stroke-[3]" />
                  </button>
                  <span className="text-base font-black text-[#1B1209] tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(product, currentVariant || undefined)}
                    className="w-9 h-9 rounded-xl bg-[#C2570C] text-white flex items-center justify-center font-black active:scale-90"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Collapsible Accordion Sections */}
          <div className="border-t border-[#EADBCE] dark:border-stone-800 divide-y divide-[#EADBCE] dark:divide-stone-800 text-xs">
            {/* Highlights */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion('highlights')}
                className="w-full flex items-center justify-between font-bold text-[#1B1209] dark:text-white"
              >
                <span>Highlights & Key Benefits</span>
                {openSection === 'highlights' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSection === 'highlights' && (
                <div className="mt-2 space-y-1.5 text-stone-600 dark:text-stone-300">
                  <p>{product.description}</p>
                  {product.details?.benefits?.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion('desc')}
                className="w-full flex items-center justify-between font-bold text-[#1B1209] dark:text-white"
              >
                <span>Product Specifications</span>
                {openSection === 'desc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSection === 'desc' && (
                <div className="mt-2 text-stone-600 dark:text-stone-300 space-y-1">
                  <p>Category: {product.categoryLabel}</p>
                  <p>Subcategory: {product.subcategory}</p>
                  <p>Pack Unit: {product.unit}</p>
                  <p>Origin: {product.details?.origin || 'India'}</p>
                </div>
              )}
            </div>

            {/* Shelf Life */}
            {product.details?.shelfLife && (
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shelf')}
                  className="w-full flex items-center justify-between font-bold text-[#1B1209] dark:text-white"
                >
                  <span>Shelf Life & Storage</span>
                  {openSection === 'shelf' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'shelf' && (
                  <div className="mt-2 text-stone-600 dark:text-stone-300">
                    <p>Shelf Life: {product.details.shelfLife}</p>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Store in a cool, hygienic and dry place away from direct sunlight.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Manufacturer */}
            {product.details?.manufacturer && (
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion('manufacturer')}
                  className="w-full flex items-center justify-between font-bold text-[#1B1209] dark:text-white"
                >
                  <span>Manufacturer & Customer Care</span>
                  {openSection === 'manufacturer' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'manufacturer' && (
                  <div className="mt-2 text-stone-600 dark:text-stone-300 space-y-1">
                    <p>Marketed by: {product.details.manufacturer}</p>
                    <p>Customer Support: {STORE_CONFIG.email}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products Shelf */}
      {similarProducts.length > 0 && (
        <ProductShelf
          title="Similar Products in Store"
          subtitle="Explore related groceries and household essentials"
          products={similarProducts}
          categoryFilter={product.category}
        />
      )}

      {/* Sticky Bottom Bar on Mobile with Stepper + "Add to Cart" */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#1A120B] border-t border-[#EADBCE] dark:border-stone-800 p-3 md:hidden shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-stone-500 block uppercase">Total</span>
          <span className="text-lg font-black text-[#1B1209] dark:text-white tabular-nums">
            {formatINR(price)}
          </span>
        </div>

        <div className="flex-1 max-w-[240px]">
          {!product.inStock ? (
            <button
              type="button"
              disabled
              className="w-full py-2.5 rounded-xl bg-stone-200 text-stone-400 font-bold text-xs"
            >
              Out of Stock
            </button>
          ) : qty === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(product, currentVariant || undefined)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] text-white font-extrabold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="flex items-center justify-between p-1 rounded-xl bg-[#FFF8EC] border-2 border-[#C2570C]">
              <button
                type="button"
                onClick={() => decrementQuantity(product.id, currentVariant?.id)}
                className="w-7 h-7 rounded-lg bg-white border border-[#C2570C] text-[#C2570C] flex items-center justify-center font-black active:scale-90"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="text-sm font-black text-[#1B1209] tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => addToCart(product, currentVariant || undefined)}
                className="w-7 h-7 rounded-lg bg-[#C2570C] text-white flex items-center justify-center font-black active:scale-90"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
