import React, { useState } from 'react';
import { FAQ_DATA } from '../data/assets';
import { ChevronDown, ChevronUp, Search, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FaqPage: React.FC = () => {
  const { navigate } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '1-0': true,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12 sm:pb-16 font-poppins">
      {/* Header */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#EBF0EC] border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#4A6B5D] font-bold mb-2">
            Clinical Support & Knowledge Base
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12181E] tracking-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Clear, transparent clinical guidance regarding formulation biology, application routines, and our 30-day money-back guarantee.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by ingredient, routine, or shipping..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-[#12181E] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4A6B5D] shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* Accordion Categories */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8 sm:space-y-10">
        {FAQ_DATA.map((cat, catIdx) => {
          const matchingItems = cat.items.filter(
            (item) =>
              searchQuery === '' ||
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (matchingItems.length === 0) return null;

          return (
            <div key={cat.category} className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#12181E] pb-2 border-b border-stone-200">
                {cat.category}
              </h2>

              <div className="space-y-3">
                {matchingItems.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div
                      key={item.question}
                      className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                      >
                        <span className="text-sm sm:text-base font-semibold text-[#12181E]">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Direct Clinical Support Card */}
        <div className="bg-[#12181E] text-white rounded-2xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Dermatological Advisory Desk</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">
              Have a Specific Skin Concern?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg leading-relaxed">
              Our clinical advisory team is available to assist with formulation compatibility, active retinoid routines, or allergic sensitivity questions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="mailto:support@lumendermatology.com"
              className="px-6 py-3 bg-[#4A6B5D] hover:bg-[#3D5A4E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email Our Team</span>
            </a>
            <button
              onClick={() => navigate('/products/barrier-repair-serum')}
              className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors text-center"
            >
              Shop Serum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
