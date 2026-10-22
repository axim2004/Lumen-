import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { MAIN_PRODUCT, CDN_IMAGES } from '../data/assets';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigate, formatPrice } = useCart();
  const [query, setQuery] = useState('');

  const quickSuggestions = [
    'Barrier Repair Serum',
    'Ceramides 3%',
    'Niacinamide',
    'Rosacea & Redness',
    'Post-Retinol Peeling',
    'Clinical 14-Day Results',
  ];

  const handleSelectProduct = () => {
    closeSearch();
    navigate('/products/barrier-repair-serum');
  };

  const isMatching =
    query === '' ||
    MAIN_PRODUCT.name.toLowerCase().includes(query.toLowerCase()) ||
    MAIN_PRODUCT.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    'ceramide niacinamide squalane redness repair'.includes(query.toLowerCase());

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 p-4 font-poppins">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden z-10"
          >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#4A6B5D]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clinical serums, ceramides, skin concerns..."
            className="flex-1 text-base text-[#12181E] placeholder:text-stone-400 focus:outline-none"
          />
          <button
            onClick={closeSearch}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Results */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Quick Suggestions */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2.5">
              Popular Clinical Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="text-xs px-3 py-1.5 bg-[#F8F9FA] hover:bg-stone-200 text-stone-700 rounded-lg transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              Matched Formulations ({isMatching ? '1' : '0'})
            </p>

            {isMatching ? (
              <div
                onClick={handleSelectProduct}
                className="group flex items-center justify-between p-4 rounded-xl border border-stone-200 hover:border-[#4A6B5D] hover:bg-[#F8F9FA] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg p-1 border border-stone-200 shrink-0">
                    <img
                      src={CDN_IMAGES.thumbnailPreview}
                      alt={MAIN_PRODUCT.name}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase text-[#4A6B5D] bg-[#E0F2FE] px-2 py-0.5 rounded">
                        Clinical Hero
                      </span>
                      <span className="text-xs text-stone-400">★ 4.9 (1,280 reviews)</span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-[#12181E] group-hover:text-[#4A6B5D] transition-colors mt-0.5">
                      {MAIN_PRODUCT.name}
                    </h4>
                    <p className="text-xs text-stone-500">
                      3% Ceramides NP/AP/EOP · Niacinamide · Squalane
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-[#12181E] tabular-nums">
                    {formatPrice(MAIN_PRODUCT.price)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-[#4A6B5D] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-stone-500 text-sm">
                No matching product found for &quot;{query}&quot;. Try searching for &quot;Ceramides&quot; or &quot;Serum&quot;.
              </div>
            )}
          </div>
        </div>

        {/* Footer Micro Note */}
        <div className="p-3 bg-[#F8F9FA] border-t border-stone-100 text-center text-xs text-stone-500 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#4A6B5D]" />
          <span>All LUMEN products are 100% cruelty-free, vegan & fragrance-free</span>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};
