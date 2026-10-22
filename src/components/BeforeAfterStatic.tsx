import React from 'react';
import { motion, type Variants } from 'motion/react';
import { CDN_IMAGES } from '../data/assets';
import { CheckCircle2, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

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

export const BeforeAfterStatic: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionStaggerContainer}
      className="py-10 sm:py-14 md:py-16 bg-[#F3F4F6] border-y border-stone-200/80 font-poppins"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={itemFadeUp}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <p className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold mb-2">
            14-Day Clinical Trial Photography
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12181E] tracking-tight mb-4">
            Real Results in 14 Days
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Direct clinical photographic demonstration under standardized cross-polarized spectrometry without cosmetic retouching.
          </p>
        </motion.div>

        {/* Single Demonstration Image Container */}
        <motion.div
          variants={itemFadeUp}
          className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm p-4 sm:p-6 mb-8"
        >
          <div className="relative aspect-[16/9] sm:aspect-[2/1] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-inner">
            <img
              src={CDN_IMAGES.pdpBeforeAfterSplit4}
              alt="14-Day Clinical Trial Demonstration: Before Day 0 vs After Day 14"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-light gap-2 px-1">
            <span>Left: Day 0 Baseline Intake · Right: Day 14 Clinical Recovery</span>
            <span>Unretouched Spectrometry Cohort (N=68)</span>
          </div>
        </motion.div>

        {/* Written Clinical Observations (Before vs After Demonstration) */}
        <motion.div variants={sectionStaggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Before Clinical State */}
          <motion.div
            variants={itemFadeUp}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <h3 className="text-base font-bold text-[#12181E]">
                  Day 0 Baseline: Compromised Barrier
                </h3>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                Clinical intake revealed acute stratum micro-fissuring, cellular lipid depletion, active erythema (redness), and persistent stinging upon application of basic moisturizers.
              </p>
              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-500 font-normal">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>High Trans-Epidermal Water Loss (TEWL: 28.4 g/m²h)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Severe tightness and flaking across mid-face</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: After Clinical Recovery */}
          <motion.div
            variants={itemFadeUp}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4A6B5D]" />
                <h3 className="text-base font-bold text-[#12181E]">
                  Day 14 Outcome: Restored Lipid Bilayer
                </h3>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                Following 14 days of twice-daily LUMEN application, the epidermal barrier achieved healthy intercellular cohesion. Surface flaking resolved and cellular hydration stabilized.
              </p>
              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-600 font-normal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
                  <span>68% Reduction in TEWL (Normalized to 9.1 g/m²h)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
                  <span>100% elimination of reactive burning & irritation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Clinical Study Footer Micro Specs */}
        <motion.div
          variants={itemFadeUp}
          className="mt-6 p-4 sm:p-5 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 font-normal"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#4A6B5D] shrink-0" />
            <span>Supervised by board-certified dermatologists on compromised and post-procedure skin.</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400 font-light">
            <Clock className="w-3.5 h-3.5" />
            <span>Morning & Evening Ritual (3–4 drops)</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

