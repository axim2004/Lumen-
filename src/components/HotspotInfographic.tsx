import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { CDN_IMAGES } from '../data/assets';
import { Sparkles, ShieldCheck, Droplet, Recycle, CheckCircle2 } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  badge: string;
  description: string;
  icon: typeof Droplet;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'dropper',
    x: 50,
    y: 18,
    title: 'Micro-Calibrated Dropper',
    badge: 'Precision Dosing',
    description: 'Apothecary glass pipette delivering exact 0.3ml doses per draw to prevent product waste.',
    icon: Droplet,
  },
  {
    id: 'ceramides',
    x: 42,
    y: 48,
    title: '3% Biomimetic Ceramide Complex',
    badge: 'Clinical 3:1:1 Ratio',
    description: 'Ceramides NP, AP, and EOP combined with bio-fermented Phytosphingosine to seal micro-fissures.',
    icon: ShieldCheck,
  },
  {
    id: 'formulation',
    x: 62,
    y: 62,
    title: 'Dermatologist Formulated',
    badge: 'Zero Fragrance / Hypoallergenic',
    description: 'Engineered by board-certified dermatologists specifically for compromised barriers and rosacea.',
    icon: Sparkles,
  },
  {
    id: 'packaging',
    x: 48,
    y: 84,
    title: '50ml Recyclable Glass Bottle',
    badge: 'Eco-Luxury Craft',
    description: 'UV-protective amber flint glass preserves active lipid stability without chemical preservatives.',
    icon: Recycle,
  },
];

const sectionStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HotspotInfographic: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[1]);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionStaggerContainer}
      className="py-10 sm:py-14 md:py-16 bg-white border-b border-stone-200/80 font-poppins"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemFadeUp} className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold mb-2">
            Anatomy of Barrier Restoration
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12181E] tracking-tight mb-4">
            Clinical Precision Inside & Out
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
            Every millimeter of the LUMEN delivery system is designed to preserve active lipid integrity and deliver immediate skin comfort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Infographic Visual with Interactive Pins */}
          <motion.div variants={itemFadeUp} className="lg:col-span-7 relative bg-[#F8F9FA] rounded-2xl p-4 sm:p-6 border border-stone-200/80 overflow-hidden shadow-inner">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={CDN_IMAGES.infographic}
                alt="LUMEN Dermatology Clinical Barrier Repair Serum Infographic"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Interactive Hotspot Buttons */}
              {HOTSPOTS.map((hotspot) => {
                const isActive = activeHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setActiveHotspot(hotspot)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6B5D]"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    aria-label={`Inspect ${hotspot.title}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Animated Pulse Waves */}
                      <motion.span
                        animate={{
                          scale: [1, 1.6, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.2,
                          ease: 'easeInOut',
                        }}
                        className={`absolute w-7 h-7 rounded-full ${
                          isActive ? 'bg-[#4A6B5D]/40' : 'bg-[#4A6B5D]/20'
                        }`}
                      />
                      {/* Pin Button */}
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                          isActive
                            ? 'bg-[#4A6B5D] text-white ring-2 ring-white scale-110 shadow-lg'
                            : 'bg-white text-[#12181E] border border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        +
                      </motion.div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 text-center text-xs text-stone-500">
              Click the interactive pins above to explore clinical delivery features
            </div>
          </motion.div>

          {/* Interactive Feature Panel with Smooth Crossfade */}
          <motion.div variants={itemFadeUp} className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#F8F9FA] p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4A6B5D] bg-[#E0F2FE] px-2.5 py-1 rounded">
                    {activeHotspot.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#12181E] mb-3">
                  {activeHotspot.title}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  {activeHotspot.description}
                </p>

                <div className="border-t border-stone-200/80 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
                    <span>Dermatologist Formulated & Tested</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
                    <span>Zero Fragrance, Essential Oils, or Phthalates</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
                    <span>100% Recyclable Glass & FSC Kraft Box</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-2 gap-3">
              {HOTSPOTS.map((h) => {
                const isSelected = activeHotspot.id === h.id;
                const IconComponent = h.icon;
                return (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(h)}
                    className={`text-left p-3.5 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'border-[#4A6B5D] bg-[#4A6B5D]/5 font-semibold text-[#12181E]'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-[#4A6B5D]' : 'text-stone-400'}`} />
                    <div className="truncate">{h.title}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
