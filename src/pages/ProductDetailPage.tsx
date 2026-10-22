import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CDN_IMAGES, MAIN_PRODUCT } from '../data/assets';
import { PurchaseType } from '../types';
import { ReviewsSection } from '../components/ReviewsSection';
import {
  Star,
  ShieldCheck,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Lock,
  Flame,
  Truck,
  RotateCcw,
  Droplets,
  Layers,
  Leaf,
  Check,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { addToCart, openCheckout, formatPrice } = useCart();

  // All product photography images (pure image assets with NO labels/text on images)
  const productImages = [
    CDN_IMAGES.pdpMasterAnchor1,
    CDN_IMAGES.pdpDropperTexture2,
    CDN_IMAGES.pdpModelApplication3,
    CDN_IMAGES.pdpBeforeAfterSplit4,
    CDN_IMAGES.pdpCraftPackaging5,
    CDN_IMAGES.pdpBotanicalActives6,
    CDN_IMAGES.thumbnailPreview,
  ];

  // Gallery swipe and thumbnail window state
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [thumbStartIndex, setThumbStartIndex] = useState<number>(0);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  // Swipe touch tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  // Purchase box state
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('subscription');
  const [subscriptionInterval, setSubscriptionInterval] = useState<string>('Every 30 Days');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string>('formulation');

  // Keep thumbnail 4-item window aligned with active image
  useEffect(() => {
    if (activeImageIndex < thumbStartIndex) {
      setThumbStartIndex(activeImageIndex);
    } else if (activeImageIndex >= thumbStartIndex + 4) {
      setThumbStartIndex(activeImageIndex - 3);
    }
  }, [activeImageIndex, thumbStartIndex]);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true);
    setTouchDeltaX(0);
  };

  // Mouse and Touch Drag Tracking
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragStart = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true);
    setDragDeltaX(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || dragStartX === null) return;
    setDragDeltaX(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging || dragStartX === null) return;
    const threshold = 40;
    if (dragDeltaX < -threshold) {
      handleNextImage();
    } else if (dragDeltaX > threshold) {
      handlePrevImage();
    }
    setDragStartX(null);
    setDragDeltaX(0);
    setIsDragging(false);
  };

  // Thumbnail window pagination
  const handleThumbPrev = () => {
    setThumbStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleThumbNext = () => {
    setThumbStartIndex((prev) => Math.min(productImages.length - 4, prev + 1));
  };

  const visibleThumbnails = productImages.slice(thumbStartIndex, thumbStartIndex + 4);

  const handleAddToCart = () => {
    addToCart(purchaseType, subscriptionInterval, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleDirectBuy = () => {
    addToCart(purchaseType, subscriptionInterval, quantity);
    openCheckout();
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? '' : id);
  };

  const calculatedUnitPrice =
    purchaseType === 'subscription' ? MAIN_PRODUCT.subscriptionPrice : MAIN_PRODUCT.price;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-poppins">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-stone-500 font-normal">
        <span className="hover:text-stone-800 transition-colors cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-stone-800 transition-colors cursor-pointer">Clinical Skincare</span>
        <span className="mx-2">/</span>
        <span className="text-[#12181E] font-medium">{MAIN_PRODUCT.name}</span>
      </div>

      {/* Main PDP Grid: Left side image gallery, Right side details on PC view */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ======================================================== */}
          {/* LEFT SIDE: Touch-Friendly Swipable Carousel (PC Left)     */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            {/* Main Stage Viewport with Carousel Track */}
            <div
              className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-hidden select-none cursor-grab active:cursor-grabbing group touch-pan-y"
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              {/* Sliding Carousel Track */}
              <div
                className="w-full h-full flex"
                style={{
                  transform: isDragging
                    ? `calc(-${activeImageIndex * 100}% + ${dragDeltaX}px)`
                    : `translateX(-${activeImageIndex * 100}%)`,
                  transition: isDragging ? 'none' : 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {productImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="w-full h-full shrink-0 flex items-center justify-center p-3 sm:p-8"
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      className="w-full h-full object-contain pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Prev / Next Swipe Navigation Arrows - Hidden on mobile view as requested */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="hidden sm:flex absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-stone-200 text-stone-700 hover:text-[#4A6B5D] hover:bg-white items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="hidden sm:flex absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-stone-200 text-stone-700 hover:text-[#4A6B5D] hover:bg-white items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Lightbox Zoom Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomOpen(true);
                }}
                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-stone-700 hover:text-[#4A6B5D] hover:bg-white transition-all opacity-80 group-hover:opacity-100 z-10"
                aria-label="Enlarge image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none z-10">
                {productImages.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      activeImageIndex === i ? 'w-6 bg-[#4A6B5D]' : 'w-1.5 bg-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Blocks: Exactly 4 Items Visible at Once in a Minimalist Row */}
            <div className="relative flex items-center gap-2">
              {/* Prev Thumb Scroll */}
              {thumbStartIndex > 0 && (
                <button
                  onClick={handleThumbPrev}
                  className="w-7 h-7 rounded-full bg-white shadow-sm border border-stone-200 text-stone-600 hover:text-black flex items-center justify-center shrink-0 z-10"
                  aria-label="Previous thumbnails"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* 4 Clean Thumbnail Blocks */}
              <div className="grid grid-cols-4 gap-3 flex-1">
                {visibleThumbnails.map((imgUrl, localIdx) => {
                  const globalIdx = thumbStartIndex + localIdx;
                  const isActive = activeImageIndex === globalIdx;

                  return (
                    <button
                      key={globalIdx}
                      onClick={() => setActiveImageIndex(globalIdx)}
                      className={`relative aspect-square rounded-xl bg-white border p-1.5 transition-all overflow-hidden focus:outline-none ${
                        isActive
                          ? 'border-[#4A6B5D] ring-2 ring-[#4A6B5D]/40 shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Thumbnail ${globalIdx + 1}`}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className="w-full h-full object-contain pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Next Thumb Scroll */}
              {thumbStartIndex + 4 < productImages.length && (
                <button
                  onClick={handleThumbNext}
                  className="w-7 h-7 rounded-full bg-white shadow-sm border border-stone-200 text-stone-600 hover:text-black flex items-center justify-center shrink-0 z-10"
                  aria-label="Next thumbnails"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE: Product Title, Pricing, Add to Cart (PC Right) */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-6">
              {/* Rating & In-Stock indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#12181E] tabular-nums">4.9/5</span>
                  <a href="#reviews" className="text-xs text-stone-500 hover:text-[#4A6B5D] underline font-normal">
                    (1,280 Reviews)
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Flame className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>In Stock · Ships in 24h</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#12181E] tracking-tight">
                  {MAIN_PRODUCT.name}
                </h1>
                <p className="text-stone-600 text-sm mt-1.5 leading-relaxed font-normal">
                  {MAIN_PRODUCT.subtitle}
                </p>
                <p className="text-xs text-stone-400 mt-1 font-light">
                  Volume: {MAIN_PRODUCT.volume}
                </p>
              </div>

              {/* Pricing Bar */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-stone-100">
                <span className="text-3xl font-bold text-[#12181E] tabular-nums">
                  {formatPrice(calculatedUnitPrice * quantity)}
                </span>
                <span className="text-base text-stone-400 line-through tabular-nums font-normal">
                  {formatPrice(MAIN_PRODUCT.originalPrice * quantity)}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4A6B5D] bg-[#E0F2FE] px-2.5 py-1 rounded-md">
                  SAVE 20%
                </span>
              </div>

              {/* Purchase Type Selector */}
              <div className="space-y-3">
                {/* Option A: Subscribe & Save */}
                <div
                  onClick={() => setPurchaseType('subscription')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    purchaseType === 'subscription'
                      ? 'border-[#4A6B5D] bg-[#F2F6F4]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          purchaseType === 'subscription'
                            ? 'border-[#4A6B5D] bg-[#4A6B5D]'
                            : 'border-stone-400 bg-white'
                        }`}
                      >
                        {purchaseType === 'subscription' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-[#12181E] block">
                          Subscribe & Save 20% + Free Shipping
                        </span>
                        <span className="text-[11px] text-[#4A6B5D] font-normal">
                          Auto-replenished. Pause, swap, or cancel anytime.
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-[#12181E] tabular-nums">
                      {formatPrice(MAIN_PRODUCT.subscriptionPrice)}
                    </span>
                  </div>

                  {/* Frequency Dropdown */}
                  {purchaseType === 'subscription' && (
                    <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                      <span className="text-stone-600 font-medium">Delivery Frequency:</span>
                      <select
                        value={subscriptionInterval}
                        onChange={(e) => setSubscriptionInterval(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                      >
                        <option value="Every 30 Days">Every 30 Days (Recommended)</option>
                        <option value="Every 45 Days">Every 45 Days</option>
                        <option value="Every 60 Days">Every 60 Days</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Option B: One-Time Purchase */}
                <div
                  onClick={() => setPurchaseType('onetime')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    purchaseType === 'onetime'
                      ? 'border-[#4A6B5D] bg-[#F2F6F4]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          purchaseType === 'onetime'
                            ? 'border-[#4A6B5D] bg-[#4A6B5D]'
                            : 'border-stone-400 bg-white'
                        }`}
                      >
                        {purchaseType === 'onetime' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#12181E]">
                        One-Time Purchase
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-[#12181E] tabular-nums">
                      {formatPrice(MAIN_PRODUCT.price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & High-Contrast Add To Cart */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-stone-600 hover:text-black transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-[#12181E] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-stone-600 hover:text-black transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add To Cart Sage Green Button with Animated Feedback */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className={`flex-1 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                      justAdded
                        ? 'bg-[#3D5A4E] text-white ring-2 ring-[#4A6B5D]'
                        : 'bg-[#4A6B5D] hover:bg-[#3D5A4E] text-white'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#D4AF37]" />
                        <span>Added To Bag!</span>
                      </>
                    ) : (
                      <span>ADD TO CART · {formatPrice(calculatedUnitPrice * quantity)}</span>
                    )}
                  </motion.button>
                </div>

                {/* Instant 1-Click Buy */}
                <button
                  onClick={handleDirectBuy}
                  className="w-full py-3.5 bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <span>BUY WITH PAYPAL / APPLE PAY</span>
                </button>
              </div>

              {/* Shipping & Guarantee Micro-Bar (Card icons removed as requested) */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600 font-normal">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#4A6B5D]" />
                    <span>Free Shipping on Orders &gt;$50</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-[#4A6B5D]" />
                    <span>30-Day Money-Back Guarantee</span>
                  </span>
                </div>
                <p className="text-center text-[11px] text-stone-400 flex items-center justify-center gap-1 font-light pt-1">
                  <Lock className="w-3 h-3 text-[#4A6B5D]" />
                  <span>256-Bit SSL Encrypted Checkout | 30-Day Money Back Guarantee</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BELOW BUY SECTION: Formulation & Clinical Breakdown Tabs  */}
        {/* ======================================================== */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold">
              Formulation & Research
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#12181E] tracking-tight mt-1">
              Scientific Specifications
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs divide-y divide-stone-100 overflow-hidden">
            {/* Accordion 1: Formulation & Ingredients */}
            <div>
              <button
                onClick={() => toggleAccordion('formulation')}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-[#12181E] hover:bg-stone-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#4A6B5D]" />
                  <span>Formulation & Active Ingredients</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-250 ${
                    openAccordion === 'formulation' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'formulation' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-xs text-stone-600 space-y-4 font-normal">
                      <p className="leading-relaxed">
                        LUMEN replaces standard filler bases with pure active bio-lipid fractions designed to match human epidermis:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {MAIN_PRODUCT.keyIngredients.map((ing) => (
                          <div key={ing.name} className="p-3 bg-[#F8F9FA] rounded-xl border border-stone-200/80">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-[#12181E]">{ing.name}</span>
                              <span className="text-[10px] font-bold text-[#4A6B5D] bg-[#E0F2FE] px-1.5 py-0.5 rounded">
                                {ing.percentage}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 font-light">{ing.benefit}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-800 mb-1">Full Clinical INCI List:</p>
                        <p className="text-[11px] text-stone-500 font-mono leading-relaxed bg-[#F8F9FA] p-3 rounded-lg border border-stone-200">
                          {MAIN_PRODUCT.fullIngredients}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: How To Use */}
            <div>
              <button
                onClick={() => toggleAccordion('howtouse')}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-[#12181E] hover:bg-stone-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#4A6B5D]" />
                  <span>How To Use & Ritual Guide</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-250 ${
                    openAccordion === 'howtouse' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'howtouse' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-xs text-stone-600 space-y-3 font-normal">
                      <p className="leading-relaxed">
                        Dispense 3–4 drops into clean palms morning and evening. Press gently into slightly damp skin across face and neck.
                      </p>
                      <ul className="space-y-2 list-disc pl-4 text-stone-600 font-light">
                        <li><strong>Retinoid Cushioning:</strong> Apply 3 minutes before retinol or prescription tretinoin to prevent barrier cracking.</li>
                        <li><strong>AM Protocol:</strong> Apply following vitamin C or gentle essence; layer under mineral sunscreen.</li>
                        <li><strong>PM Ritual:</strong> Pair with facial oils or night balms for overnight barrier occlusion.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3: Clinical Study Results */}
            <div>
              <button
                onClick={() => toggleAccordion('clinical')}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-[#12181E] hover:bg-stone-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#4A6B5D]" />
                  <span>Clinical Study Results (14-Day Cohort)</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-250 ${
                    openAccordion === 'clinical' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'clinical' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-xs text-stone-600 space-y-3 font-normal">
                      <p className="leading-relaxed">
                        Evaluated on 68 male and female human subjects aged 21–64 presenting with clinically compromised epidermal barriers:
                      </p>
                      <div className="space-y-2">
                        {MAIN_PRODUCT.clinicalMetrics.map((m, i) => (
                          <div key={i} className="flex items-start gap-3 p-2.5 bg-[#F8F9FA] rounded-lg">
                            <span className="text-base font-bold text-[#4A6B5D] shrink-0">
                              {m.percentage}
                            </span>
                            <div>
                              <p className="font-semibold text-stone-800">{m.claim}</p>
                              <p className="text-[11px] text-stone-400 font-light">{m.timeframe}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 4: Shipping & Returns Policy */}
            <div>
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-[#12181E] hover:bg-stone-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#4A6B5D]" />
                  <span>Shipping & 30-Day Trial Policy</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-250 ${
                    openAccordion === 'shipping' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'shipping' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-xs text-stone-600 space-y-2 leading-relaxed font-normal">
                      <p>
                        <strong>Free Express Shipping:</strong> Orders over $50 qualify for complimentary climate-neutral express shipping (2–4 business days delivery in the US).
                      </p>
                      <p>
                        <strong>30-Day Risk-Free Guarantee:</strong> If your skin does not feel soothed and fortified, contact us within 30 days of receiving your package for a complete refund without hassle.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scale & Detail Reference Section (Featuring Image #4) */}
        <section className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-stone-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-stone-200">
            <div className="lg:col-span-5 aspect-square rounded-2xl overflow-hidden border border-stone-200 shadow-xs">
              <img
                src={CDN_IMAGES.detailMacroBottle}
                alt="Macro Detail View of LUMEN Glass Dropper & Viscosity"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold">
                  Macro Precision & Tactile Sensory
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#12181E] tracking-tight mt-1 mb-3">
                  Micro-Emulsion Texture Architecture
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-normal">
                  Unlike traditional thick petrolatum barrier balms that trap bacteria or sticky gel serums that pill under sunscreen, LUMEN utilizes a micro-emulsion lipid vehicle that absorbs within 8 seconds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-normal">
                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-stone-200">
                  <p className="font-semibold text-[#12181E] mb-1">0% Tackiness / Zero Residue</p>
                  <p className="text-stone-500 font-light">Leaves skin smooth with a velvet-dewy finish that primes immediately for cosmetics or physical SPF.</p>
                </div>
                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-stone-200">
                  <p className="font-semibold text-[#12181E] mb-1">pH Balanced to 5.4</p>
                  <p className="text-stone-500 font-light">Matches physiological acid mantle to foster beneficial commensal skin microbiota.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Reviews Module */}
        <div className="mt-10 sm:mt-12">
          <ReviewsSection />
        </div>
      </div>

      {/* Lightbox Modal with smooth scale & fade */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center z-10"
            >
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                ✕ Close
              </button>
              <img
                src={productImages[activeImageIndex]}
                alt="LUMEN Clinical Serum preview"
                className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
