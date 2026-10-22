import React, { useState, useRef, useCallback } from 'react';
import { CDN_IMAGES } from '../data/assets';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-20 md:py-28 bg-[#F3F4F6] border-y border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold mb-2">
            14-Day Clinical Photography Cohort
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#12181E] tracking-tight mb-4">
            Real Results in 14 Days
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Drag the interactive slider to inspect active barrier recovery under clinical polarized cross-lighting.
          </p>
        </div>

        {/* Comparison Widget Card */}
        <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-sm border border-stone-200/70">
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden select-none cursor-ew-resize touch-none"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* Background Image (After - Full right perspective) */}
            <img
              src={CDN_IMAGES.pdpBeforeAfterSplit4}
              alt="Clinical trial after 14 days showing restored epidermal barrier"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
              loading="lazy"
            />

            {/* Foreground Cliped View (Before - Left perspective) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={CDN_IMAGES.pdpBeforeAfterSplit4}
                alt="Clinical trial before day 0 showing compromised irritated skin barrier"
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                style={{
                  filter: 'contrast(1.08) saturate(0.92)',
                }}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>

            {/* Split Vertical Line and Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-20 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle Token */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white text-[#12181E] rounded-full shadow-xl border border-stone-300 flex items-center justify-center font-mono text-xs font-bold tracking-tighter cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                aria-label="Drag comparison slider"
              >
                <div className="flex items-center gap-1 text-[#4A6B5D]">
                  <span className="text-[10px]">◄</span>
                  <div className="w-[3px] h-4 bg-[#4A6B5D] rounded-full"></div>
                  <span className="text-[10px]">►</span>
                </div>
              </div>
            </div>

            {/* Left Tag: BEFORE */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <div className="bg-[#12181E]/85 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-md shadow-md border border-white/20">
                <span className="font-semibold text-rose-300">BEFORE (Day 0):</span> Irritated, Compromised Barrier
              </div>
            </div>

            {/* Right Tag: AFTER */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <div className="bg-[#4A6B5D]/90 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-md shadow-md border border-white/20">
                <span className="font-semibold text-[#E0F2FE]">AFTER (Day 14):</span> Smooth, Hydrated & Dewy
              </div>
            </div>

            {/* Bottom Accessibility Range Control */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Before and after barrier repair comparison slider"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 pointer-events-auto"
            />
          </div>

          {/* Micro Footer Notes */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2 border-t border-stone-100 pt-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D]"></span>
              <span>Photographed under unretouched clinical cross-polarized daylight spectrometry</span>
            </div>
            <div className="flex items-center gap-3 font-medium">
              <span>Cohort N=68</span>
              <span>·</span>
              <span>Twice Daily Application</span>
              <span>·</span>
              <span>Independent Clinical Laboratory</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
