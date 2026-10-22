import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Tag, Check } from 'lucide-react';
import { CROSS_SELL_PRODUCT } from '../data/assets';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    addToCart,
    subtotal,
    discountAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    hasFreeShipping,
    remainingForFreeShipping,
    freeShippingThreshold,
    shippingCost,
    taxAmount,
    finalTotal,
    formatPrice,
    openCheckout,
    navigate,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    if (!promoInput.trim()) return;

    const ok = applyPromoCode(promoInput);
    if (ok) {
      setPromoSuccess(`Promo code ${promoInput.toUpperCase()} applied!`);
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try GLOW15 for 15% off.');
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round(((freeShippingThreshold - remainingForFreeShipping) / freeShippingThreshold) * 100)
  );

  const hasCrossSell = items.some((i) => i.productId === CROSS_SELL_PRODUCT.id);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 font-poppins">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200"
            >
          {/* 1. Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#F8F9FA]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#4A6B5D]" />
              <h2 className="text-base font-bold text-[#12181E] tracking-tight">
                Your Skincare Bag
              </h2>
              <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-medium">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Shipping Progress Bar */}
          <div className="p-4 bg-[#F0F5F2] border-b border-[#D8E6DE]">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              {hasFreeShipping ? (
                <span className="text-[#3D5A4E] font-semibold flex items-center gap-1">
                  <span>🎉</span> You have unlocked FREE Express Delivery!
                </span>
              ) : (
                <span className="text-stone-700">
                  Add <strong className="text-[#4A6B5D]">{formatPrice(remainingForFreeShipping)}</strong> more to unlock <strong className="text-stone-900">FREE Express Shipping</strong>
                </span>
              )}
              <span className="text-[11px] font-bold text-[#4A6B5D]">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#4A6B5D] rounded-full"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* 3. Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#12181E] mb-2">
                  Your bag is empty
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm max-w-xs mx-auto mb-6">
                  Discover dermatologist-formulated barrier repair powered by pure bioactive ceramides.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/products/barrier-repair-serum');
                  }}
                  className="px-6 py-3 bg-[#4A6B5D] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#3D5A4E] transition-colors shadow-sm"
                >
                  Shop Barrier Serum
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200 p-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-[#12181E] leading-snug">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{item.variant}</p>
                      {item.purchaseType === 'subscription' && (
                        <span className="inline-block mt-1 text-[10px] bg-[#E0F2FE] text-[#12181E] font-medium px-2 py-0.5 rounded">
                          Save 20% Active
                        </span>
                      )}
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#12181E] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#12181E] tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="block text-[11px] text-stone-400 line-through tabular-nums">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Cross-Sell Upsell Box */}
            {items.length > 0 && !hasCrossSell && (
              <div className="pt-4">
                <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E9DFCF] flex items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-lg p-1 shrink-0 border border-stone-200">
                    <img
                      src={CROSS_SELL_PRODUCT.image}
                      alt={CROSS_SELL_PRODUCT.name}
                      className="w-full h-full object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#12181E] truncate">
                      {CROSS_SELL_PRODUCT.name}
                    </p>
                    <p className="text-[11px] text-stone-500 leading-tight line-clamp-1">
                      Lymphatic drainage & absorption booster
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-[#4A6B5D] tabular-nums">
                        +{formatPrice(CROSS_SELL_PRODUCT.price)}
                      </span>
                      <span className="text-[10px] text-stone-400 line-through">
                        {formatPrice(CROSS_SELL_PRODUCT.originalPrice)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      addToCart('onetime', undefined, 1, {
                        id: CROSS_SELL_PRODUCT.id,
                      })
                    }
                    className="px-3 py-1.5 bg-[#12181E] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors shrink-0 shadow-xs"
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Cart Footer / Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#F8F9FA] space-y-4">
              {/* Promo code accordion */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code <strong>{appliedPromo}</strong> applied (-{formatPrice(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-stone-700 font-bold ml-2"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code (try GLOW15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 text-xs font-semibold bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1"><Check className="w-3 h-3"/> {promoSuccess}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#12181E] tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Special Savings</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="tabular-nums font-medium text-[#12181E]">
                    {shippingCost === 0 ? (
                      <span className="text-[#4A6B5D] font-semibold">FREE</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="tabular-nums font-medium text-[#12181E]">{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-[#12181E]">
                  <span>Total</span>
                  <span className="tabular-nums text-base">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={openCheckout}
                className="w-full py-3.5 bg-[#4A6B5D] text-white font-semibold text-sm tracking-wide uppercase rounded-xl hover:bg-[#3D5A4E] transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust Badges */}
              <div className="pt-2 text-center space-y-2">
                <div className="flex items-center justify-center gap-3 text-stone-400">
                  <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 border border-stone-300 rounded bg-white text-stone-600">VISA</span>
                  <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 border border-stone-300 rounded bg-white text-stone-600">MC</span>
                  <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 border border-stone-300 rounded bg-white text-stone-600">AMEX</span>
                  <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 border border-stone-300 rounded bg-white text-stone-600">APPLE PAY</span>
                  <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 border border-stone-300 rounded bg-white text-stone-600">PAYPAL</span>
                </div>
                <p className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B5D]" />
                  <span>256-Bit SSL Encrypted Checkout · 30-Day Money-Back Guarantee</span>
                </p>
              </div>
            </div>
          )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
