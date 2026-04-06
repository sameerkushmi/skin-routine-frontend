"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { PiFlowerLotusThin } from "react-icons/pi";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import PremiumMarquee from "./PremiumMarquee/PremiumMarquee";
import { useRouter } from "next/navigation";

/* Magnetic Button (disabled on touch devices) */
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { damping: 15, stiffness: 150 };
  const mouseX = useSpring(x, spring);
  const mouseY = useSpring(y, spring);

  const handleMove = (e) => {
    if (window.innerWidth < 768) return; // disable on mobile
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.25);
    y.set((e.clientY - (top + height / 2)) * 0.25);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: mouseX, y: mouseY }}
    >
      {children}
    </motion.div>
  );
};

const products = [
  {
    id: "01",
    title: "Brillora Tint",
    suffix: "Sunscreen",
    description:
      "Lightweight SPF sunscreen that protects against UVA/UVB rays while giving your skin a natural, radiant glow.",
    image: "/images/products/brillora.jpeg",
    href: "/shop?brand=skin-routine&category=sunscreen"
  },
  {
    id: "02",
    title: " A-HA Face Wash",
    suffix: "Fash Wash",
    description:
      "Aminu A-HA Face Wash is a gentle exfoliating cleanser formulated with natural fruit AHAs and botanical extracts that removes impurities, smooths skin texture, and enhances brightness while maintaining hydration.",
    image: "/images/products/A-HA.jpeg",
    href: "/shop?brand=aminu&category=cleanser"
  },
  {
    id: "03",
    title: "Hydra Mend",
    suffix: "Face Wash",
    description:
      "Gentle cleansing face wash that removes impurities, brightens dull skin, and promotes a fresh, luminous complexion.",
    image: "/images/products/hydramena.jpeg",
    href: "/shop?brand=skin-routine&category=cleanser"
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#FDFCFB] overflow-hidden py-16 lg:py-0">

      {/* Background Blur */}
      <div className="absolute top-[-10%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-pink-50 rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-stone-100 rounded-full blur-[80px] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">

          <AnimatePresence mode="wait">
            <motion.div
              key={products[index].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl 2xl:text-8xl font-serif text-stone-900 leading-tight tracking-tight">
                {products[index].title}
                <br />
                <span className="text-pink-300 italic font-light">
                  {products[index].suffix}
                </span>
              </h1>

              <p className="mt-4 text-stone-500 text-sm sm:text-base md:text-lg font-light max-w-md mx-auto lg:mx-0">
                {products[index].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA + Nav */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-8 pt-4 justify-center lg:justify-start">

            <MagneticButton>
              <Link
                href="/shop"
                className="group flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border border-stone-200 bg-white hover:bg-stone-900 hover:text-white transition-all duration-500"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] tracking-widest font-medium">
                    SHOP
                  </span>
                  <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </MagneticButton>

            {/* Slider Nav */}
            <div className="flex sm:flex-col gap-4">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIndex(i)}
                  className="flex items-center gap-3 group"
                >
                  <span
                    className={`text-xs font-bold ${i === index ? "text-stone-900" : "text-stone-300"
                      }`}
                  >
                    {p.id}
                  </span>
                  <div
                    className={`h-[1px] transition-all duration-500 ${i === index
                      ? "w-10 bg-stone-900"
                      : "w-5 bg-stone-200 group-hover:w-8"
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">

          <AnimatePresence mode="wait">
            <motion.div
              key={products[index].id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[450px] aspect-square rounded-[25px] md:rounded-[30px] overflow-hidden shadow-xl"
            >
              <Link href={products[index].href}>
                <Image
                  src={products[index].image}
                  alt={products[index].title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         40vw"
                  className="object-cover"
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Floating Badge (Desktop Only) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -left-10 w-28 h-28 hidden xl:flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-stone-900/10 uppercase text-[10px] tracking-[2px]">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="font-bold">
                <textPath xlinkHref="#circlePath">
                  Pure Botanicals • Conscious Beauty •
                </textPath>
              </text>
            </svg>
            <PiFlowerLotusThin className="absolute text-xl text-pink-300" />
          </motion.div>
        </div>
      </div>

      {/* Marquee Line */}
      <PremiumMarquee />
    </section>
  );
}