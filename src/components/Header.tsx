import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Check } from 'lucide-react';
import { CurrencyCode } from '../types';

export const Header: React.FC = () => {
  const {
    totalItemsCount,
    openCart,
    openSearch,
    currency,
    setCurrencyCode,
    route,
    navigate,
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'CAD'];

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop Serum', path: '/products/barrier-repair-serum' },
    { label: 'Clinical Results', path: '/#clinical-results' },
    { label: 'About Us', path: '/pages/about-us' },
    { label: 'Reviews', path: '/#reviews' },
    { label: 'FAQ', path: '/pages/faq' },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (route !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F9FA]/95 backdrop-blur-md border-b border-stone-200/80 transition-all font-poppins">
      {/* 1. Looping Announcement Bar */}
      <div className="bg-[#12181E] text-stone-200 text-xs py-2 px-4 overflow-hidden border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-6 text-[11px] font-medium tracking-wide mx-auto">
            <span>Free Express Shipping on Orders Over $50</span>
            <span className="text-[#D4AF37]">✦</span>
            <span>30-Day Money-Back Guarantee</span>
            <span className="text-[#D4AF37]">✦</span>
            <span>Dermatologist Formulated & Clinically Tested</span>
          </div>
          <div className="sm:hidden w-full text-center text-[11px] font-medium truncate">
            Free Express Shipping &gt;$50 · 30-Day Money-Back Guarantee
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#12181E] hover:text-[#4A6B5D] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left: Brand Wordmark */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleNavClick('/')}
              className="text-left group focus:outline-none"
            >
              <span className="block text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#12181E] group-hover:text-[#4A6B5D] transition-colors">
                LUMEN
              </span>
              <span className="block text-[9px] tracking-[0.25em] uppercase text-stone-500 font-sans font-medium -mt-1">
                Dermatology
              </span>
            </button>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-stone-700">
            {navLinks.map((link) => {
              const isActive = route === link.path;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className={`py-1 transition-all relative group hover:text-[#12181E] ${
                    isActive ? 'text-[#12181E] font-semibold' : 'text-stone-600'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#4A6B5D] rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right: Currency, Search, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="hidden sm:flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded text-stone-700 hover:text-[#12181E] hover:bg-stone-100 transition-colors"
                aria-label="Select currency"
              >
                <span>{currency.code} ({currency.symbol})</span>
                <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform duration-200 ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCurrencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-50"
                  >
                    {currencies.map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrencyCode(code);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F8F9FA] transition-colors ${
                          currency.code === code ? 'font-bold text-[#4A6B5D]' : 'text-stone-700'
                        }`}
                      >
                        <span>{code}</span>
                        {currency.code === code && <Check className="w-3.5 h-3.5 text-[#4A6B5D]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 text-stone-700 hover:text-[#12181E] hover:bg-stone-100 rounded-full transition-transform active:scale-90"
              aria-label="Open product search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account Trigger */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="p-2 text-stone-700 hover:text-[#12181E] hover:bg-stone-100 rounded-full transition-transform active:scale-90 hidden sm:block"
              aria-label="Account and subscriptions"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Drawer Trigger with Animated Bounce Badge */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-[#4A6B5D] text-white rounded-full hover:bg-[#3D5A4E] transition-all shadow-sm active:scale-95"
              aria-label={`Open shopping cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalItemsCount > 0 && (
                  <motion.span
                    key={totalItemsCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: [0.4, 1.25, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.28, type: 'spring', stiffness: 400 }}
                    className="absolute -top-1 -right-1 bg-[#12181E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-stone-200 px-6 py-5 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className="text-left text-base font-medium text-stone-800 hover:text-[#4A6B5D] py-1 border-b border-stone-100 transition-colors"
                >
                  {link.label}
                </button>
              ))}

              {/* Mobile Currency Chooser */}
              <div className="pt-2">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Currency</p>
                <div className="grid grid-cols-4 gap-2">
                  {currencies.map((code) => (
                    <button
                      key={code}
                      onClick={() => setCurrencyCode(code)}
                      className={`py-1.5 text-xs rounded border text-center font-medium transition-colors ${
                        currency.code === code
                          ? 'border-[#4A6B5D] bg-[#4A6B5D] text-white'
                          : 'border-stone-200 text-stone-700 bg-stone-50'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Account Action */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAccountModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider border border-stone-300 rounded-lg text-stone-800 active:bg-stone-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>My Account & Subscriptions</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Info Modal */}
      <AnimatePresence>
        {isAccountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h3 className="text-lg font-serif font-bold text-[#12181E]">
                  LUMEN Patient Portal
                </h3>
                <button
                  onClick={() => setIsAccountModalOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <div className="bg-[#F8F9FA] p-4 rounded-xl border border-stone-200">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#4A6B5D] mb-1">
                    Active Subscription Status
                  </p>
                  <p className="text-sm font-medium text-stone-800">
                    Manage Auto-Deliveries & Dermatologist Refills
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Access your delivery frequency, pause intervals, or update payment details anytime.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-medium text-stone-600">
                    Email Address
                    <input
                      type="email"
                      placeholder="dr.smith@example.com"
                      defaultValue="shaikhasim1424@gmail.com"
                      className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B5D]"
                    />
                  </label>
                  <label className="block text-xs font-medium text-stone-600">
                    Order / Subscription Reference
                    <input
                      type="text"
                      placeholder="e.g. LMN-1042"
                      className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B5D]"
                    />
                  </label>
                </div>

                <button
                  onClick={() => {
                    setIsAccountModalOpen(false);
                  }}
                  className="w-full py-3 bg-[#4A6B5D] text-white font-medium text-sm rounded-lg hover:bg-[#3D5A4E] transition-all shadow-sm active:scale-[0.99]"
                >
                  Access My Orders & Auto-Ship
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
