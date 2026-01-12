import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faDatabase,
  faMobileScreen,
  faChartLine,
  faStar,
  faUtensils,
  faMugHot,
  faBurger,
  faFish,
  faWineGlass,
  faBowlRice,
  faQrcode,
  faKitchenSet,
  faPizzaSlice,
  faCoffee,
  faIceCream,
  faPlateWheat,
  faSpoon,
  faBolt,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons';

// “Fake 3D” floating food chips (no WebGL): light DOM, GPU-friendly transforms only.
const FOOD_FLOATERS: Array<{
  icon: any;
  label: string;
  left: string;
  top: string;
  size: 'sm' | 'md' | 'lg';
  tint: 'amber' | 'purple' | 'blue';
  drift: number;
  sway: number;
  spin: number;
  delay: number;
}> = [
  { icon: faBurger, label: 'Burger', left: '6%', top: '18%', size: 'lg', tint: 'amber', drift: 14, sway: 10, spin: 6, delay: 0 },
  { icon: faFish, label: 'Fish', left: '14%', top: '62%', size: 'md', tint: 'blue', drift: 10, sway: 8, spin: -8, delay: 0.15 },
  { icon: faMugHot, label: 'Coffee', left: '34%', top: '26%', size: 'sm', tint: 'purple', drift: 9, sway: 6, spin: 10, delay: 0.2 },
  { icon: faPizzaSlice, label: 'Pizza', left: '44%', top: '70%', size: 'md', tint: 'amber', drift: 12, sway: 7, spin: -10, delay: 0.35 },
  { icon: faBowlRice, label: 'Rice bowl', left: '72%', top: '22%', size: 'md', tint: 'blue', drift: 11, sway: 9, spin: 7, delay: 0.25 },
  { icon: faWineGlass, label: 'Drink', left: '86%', top: '54%', size: 'lg', tint: 'purple', drift: 15, sway: 11, spin: -6, delay: 0.1 },
  { icon: faIceCream, label: 'Dessert', left: '63%', top: '78%', size: 'sm', tint: 'amber', drift: 8, sway: 6, spin: 12, delay: 0.42 },
  { icon: faQrcode, label: 'QR', left: '22%', top: '40%', size: 'sm', tint: 'purple', drift: 10, sway: 7, spin: -12, delay: 0.3 }
];

const sizeClasses = {
  sm: { wrap: 'w-12 h-12 md:w-14 md:h-14', icon: 'w-5 h-5 md:w-6 md:h-6', badge: 'px-2.5 py-1 text-[10px]' },
  md: { wrap: 'w-16 h-16 md:w-20 md:h-20', icon: 'w-6 h-6 md:w-7 md:h-7', badge: 'px-3 py-1 text-[10px]' },
  lg: { wrap: 'w-20 h-20 md:w-24 md:h-24', icon: 'w-7 h-7 md:w-8 md:h-8', badge: 'px-3.5 py-1.5 text-[11px]' }
} as const;

// Simplified palette: white/black + gold accent only
const tintClasses = {
  amber: {
    ring: 'from-amber-400/20 via-amber-500/10 to-transparent',
    glow: 'bg-amber-500/12',
    icon: 'text-amber-300',
    badge: 'text-amber-200 border-amber-500/25 bg-amber-500/10'
  },
  // "purple" and "blue" now map to neutral white/gray for minimal color noise
  purple: {
    ring: 'from-white/10 via-white/5 to-transparent',
    glow: 'bg-white/8',
    icon: 'text-white/80',
    badge: 'text-white/70 border-white/15 bg-white/5'
  },
  blue: {
    ring: 'from-white/10 via-white/5 to-transparent',
    glow: 'bg-white/8',
    icon: 'text-white/80',
    badge: 'text-white/70 border-white/15 bg-white/5'
  }
} as const;

export const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const disableHeavy = !!shouldReduceMotion;

  // Mouse tracking
  useEffect(() => {
    if (disableHeavy) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [disableHeavy]);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);

  useEffect(() => {
    if (disableHeavy) return;
    parallaxX.set(mousePosition.x);
    parallaxY.set(mousePosition.y);
  }, [disableHeavy, mousePosition.x, mousePosition.y, parallaxX, parallaxY]);

  const beamSkew = useTransform(parallaxX, [-1, 1], [-10, 10]);
  const beamX = useTransform(parallaxX, [-1, 1], [-70, 70]);
  const beamY = useTransform(parallaxY, [-1, 1], [-40, 40]);

  return (
    <section
      className="relative min-h-[92vh] md:min-h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 3D + cinematic background */}
      <div className="absolute inset-0 z-0">
        {/* Top glow - gold accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.10)_0%,transparent_55%)]" />
        {/* Bottom glow - subtle white */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.04)_0%,transparent_55%)]" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={disableHeavy ? undefined : { x: beamX, y: beamY, skewX: beamSkew }}
        >
          {/* Gold beam */}
          <div className="absolute -top-56 left-[-18%] h-[160%] w-[60%] rotate-12 bg-gradient-to-b from-amber-500/12 via-amber-500/4 to-transparent blur-2xl" />
          {/* White beam */}
          <div className="absolute -top-56 right-[-22%] h-[160%] w-[65%] -rotate-12 bg-gradient-to-b from-white/8 via-white/3 to-transparent blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
        </motion.div>

        {/* Lightweight glow spots - gold + white */}
        {!disableHeavy && (
          <div aria-hidden className="absolute inset-0 opacity-90">
            <div className="absolute left-[8%] top-[18%] h-56 w-56 md:h-72 md:w-72 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute right-[10%] top-[38%] h-64 w-64 md:h-80 md:w-80 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute left-[42%] top-[10%] h-40 w-40 md:h-52 md:w-52 rounded-full bg-amber-400/8 blur-3xl" />
          </div>
        )}

        {/* subtle grid/noise overlay */}
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Floating "3D" food field (no WebGL, no heavy blur icons) */}
      {!disableHeavy && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <div className="absolute inset-0">
            {FOOD_FLOATERS.map((f, idx) => {
              const s = sizeClasses[f.size];
              const t = tintClasses[f.tint];
              // First two large/medium stay in focus; others are blurred background
              const inFocus = idx < 2;

              return (
                <motion.div
                  key={f.label}
                  className="absolute"
                  style={{
                    left: f.left,
                    top: f.top,
                    opacity: inFocus ? 0.9 : 0.45,
                    filter: inFocus ? 'none' : 'blur(2.5px)'
                  }}
                  animate={{
                    y: [0, -f.drift, 0],
                    x: [0, f.sway, 0],
                    rotate: [0, f.spin, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12 + Math.abs(f.spin) * 0.35,
                    ease: 'easeInOut',
                    delay: f.delay
                  }}
                >
                  <div
                    className={
                      'relative grid place-items-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur ' +
                      s.wrap +
                      ' shadow-[0_24px_80px_rgba(0,0,0,0.35)]'
                    }
                  >
                    {/* outer ring */}
                    <div
                      className={
                        'absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br ' +
                        t.ring +
                        ' blur-xl opacity-55'
                      }
                    />
                    {/* inner glow */}
                    <div className={'absolute inset-0 rounded-3xl ' + t.glow + ' blur-2xl opacity-55'} />

                    {/* highlight */}
                    <div className="absolute left-2 top-2 h-1/2 w-1/2 rounded-3xl bg-white/10 blur-xl opacity-50" />

                    <div className="relative grid place-items-center">
                      <FontAwesomeIcon icon={f.icon} className={s.icon + ' ' + t.icon} />
                    </div>

                    {/* label chip (dim) */}
                    <div
                      className={
                        'absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border backdrop-blur opacity-60 ' +
                        t.badge +
                        ' ' +
                        s.badge
                      }
                    >
                      {f.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: headline */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur"
            >
              <FontAwesomeIcon icon={faStar} className="w-3.5 h-3.5" />
              Digital restaurant management
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-black/30 border border-white/10 px-2 py-1 text-white/80">
                <FontAwesomeIcon icon={faBolt} className="w-3 h-3 text-amber-300" /> Real-time
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] text-white"
            >
              Know. Grow.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Organize your restaurant.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-6 text-lg md:text-2xl text-gray-300/80 max-w-xl leading-relaxed"
            >
              QR ordering, real-time kitchen tickets, and payment-first workflows so nothing slips through.
              <span className="text-white font-semibold"> Guests order from their phones.</span> Staff stays in sync. <span className="text-amber-300 font-semibold">You stay in control.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => (window.location.href = 'mailto:sharptable.ng@gmail.com')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black px-8 py-5 font-extrabold text-lg shadow-[0_25px_80px_rgba(255,255,255,0.12)] hover:bg-zinc-200 transition"
              >
                Book a Demo
                <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => {
                  const el = document.getElementById('features');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 text-white border border-white/15 px-8 py-5 font-bold text-lg backdrop-blur hover:bg-white/10 transition"
              >
                See how it works
                <FontAwesomeIcon icon={faQrcode} className="w-5 h-5 text-amber-300" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 grid grid-cols-2 gap-4 max-w-xl"
            >
              {
                [
                  { icon: faCircleCheck, title: 'QR ordering', desc: 'Guests scan and order from their phones' },
                  { icon: faCircleCheck, title: 'Kitchen sync', desc: 'Tickets flow straight to chefs in real time' },
                  { icon: faCircleCheck, title: 'Payment first', desc: 'No food prep until payment is verified' },
                  { icon: faCircleCheck, title: 'Split bills', desc: 'Guests pay together or separately' },
                ].map((f) => (
                  <div key={f.title} className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-4">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <FontAwesomeIcon icon={f.icon} className="w-4 h-4 text-amber-300" />
                      {f.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-400">{f.desc}</div>
                  </div>
                ))}
            </motion.div>
          </div>

          {/* Right: product mock */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <Tilt
              glareEnable
              glareMaxOpacity={0.25}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.03}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              className="rounded-[2.5rem]"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl shadow-[0_50px_120px_rgba(0,0,0,0.55)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.25),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.22),transparent_50%)]" />

                <div className="p-6 md:p-8 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                        <FontAwesomeIcon icon={faQrcode} className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <div className="text-white font-extrabold">Live table view</div>
                        <div className="text-xs text-gray-400">QR orders + receipts</div>
                      </div>
                    </div>
                    <div className="text-xs text-amber-200 font-bold bg-amber-500/15 border border-amber-500/25 px-3 py-1.5 rounded-full">
                      LIVE
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                      <div className="text-xs text-gray-400">Repeat guests</div>
                      <div className="mt-1 text-3xl font-extrabold text-white">+32%</div>
                      <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300"
                          animate={shouldReduceMotion ? undefined : { width: ['0%', '72%'] }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                    <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                      <div className="text-xs text-gray-400">Avg order</div>
                      <div className="mt-1 text-3xl font-extrabold text-white">₦8.4k</div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                        <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-blue-300" />
                        trending up
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-black/30 border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-bold">Top items</div>
                      <div className="text-xs text-gray-400">Today</div>
                    </div>
                    <div className="mt-3 space-y-3">
                      {[
                        { icon: faBurger, label: 'Burger', value: '142' },
                        { icon: faFish, label: 'Fish', value: '118' },
                        { icon: faMugHot, label: 'Coffee', value: '97' }
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-200">
                            <FontAwesomeIcon icon={row.icon} className="w-4 h-4 text-amber-200" />
                            <span className="text-sm">{row.label}</span>
                          </div>
                          <div className="text-sm font-bold text-white">{row.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[{ icon: faMobileScreen, label: 'QR Menu' }, { icon: faDatabase, label: 'Profiles' }, { icon: faChartLine, label: 'Insights' }].map((x) => (
                      <div key={x.label} className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
                        <FontAwesomeIcon icon={x.icon} className="w-4 h-4 text-white" />
                        <div className="mt-2 text-[11px] text-gray-400">{x.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>

            {/* Glow behind card */}
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-r from-amber-500/15 via-amber-400/8 to-amber-500/15 blur-2xl opacity-80" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};