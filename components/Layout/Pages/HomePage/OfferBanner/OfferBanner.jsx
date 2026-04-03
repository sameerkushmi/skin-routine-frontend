"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";

const banners = [
    {
        id: 1,
        subtitle: "The Luminance Collection",
        name: "Glow & Hydrate Set",
        description:
            "A masterclass in moisture. Formulated with rare botanical extracts to drench your skin in lasting radiance.",
        image: "/images/homepage/offer-banner/facewash.jpeg",
        color: "#F9F5F2",
    },
    {
        id: 2,
        subtitle: "Age-Defying Science",
        name: "Ultimate Anti-Aging",
        description:
            "Redefining the passage of time. Our concentrated peptides restore elasticity and youthful vigor.",
        image: "/images/homepage/offer-banner/moisturizer.jpeg",
        color: "#F2F5F9",
    },
    {
        id: 3,
        subtitle: "Dawn Rituals",
        name: "Morning Skincare",
        description:
            "Awaken your senses. A curated selection designed to protect and prep your canvas for the day ahead.",
        image: "/images/homepage/offer-banner/sunscreen.jpeg",
        color: "#F5F2F9",
    },
];

export default function OfferBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        }),
    };

    const handleStep = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + banners.length) % banners.length);
    };

    return (
        <section className="relative w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden bg-white py-10 sm:py-16 lg:py-20 px-2 sm:px-4 lg:px-8">
            {/* Background color */}
            <div
                className="absolute top-0 right-0 w-1/3 h-full transition-colors duration-1000"
                style={{ backgroundColor: banners[currentIndex].color }}
            />

            <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

                {/* Left Text */}
                <div className="lg:col-span-5 z-10 order-2 lg:order-1">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={slideVariants}
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }}
                            className="space-y-6 sm:space-y-8"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-stone-400 font-medium"
                            >
                                {banners[currentIndex].subtitle}
                            </motion.span>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light italic text-stone-800 leading-[1.1] font-serif">
                                {banners[currentIndex].name.split(" ").map((word, i) => (
                                    <span key={i} className={i === 0 ? "block font-normal not-italic" : "block ml-4 sm:ml-6 md:ml-8"}>
                                        {word}
                                    </span>
                                ))}
                            </h2>

                            <p className="max-w-md text-stone-500 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                                {banners[currentIndex].description}
                            </p>

                            <div className="flex items-center gap-6 sm:gap-8 pt-2 sm:pt-4">
                                <Link href={`/shop`}>
                                    <motion.button
                                        whileHover={{ gap: "24px" }}
                                        className="cursor-pointer flex items-center gap-3 sm:gap-4 group text-stone-900 font-medium tracking-widest uppercase text-[9px] sm:text-xs transition-all"
                                    >
                                        Explore Collection
                                        <span className="h-[1px] w-10 sm:w-12 bg-stone-900 group-hover:w-20 transition-all" />
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-7 relative h-[200px] sm:h-[300px] md:h-[450px] lg:h-[550px] w-full order-1 lg:order-2">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                            exit={{ clipPath: "inset(0 0 0 100%)" }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            className="relative w-full h-full"
                        >
                            <Link href={'/shop'}>
                                <Image
                                    src={banners[currentIndex].image}
                                    alt={banners[currentIndex].name}
                                    fill
                                    priority
                                    className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                />
                            </Link>
                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-4 -left-4 bg-white p-4 sm:p-6 hidden md:block shadow-2xl max-w-[140px] sm:max-w-[160px] md:max-w-[200px]"
                            >
                                <p className="text-[8px] sm:text-[9px] uppercase tracking-tighter text-stone-400 mb-1 sm:mb-2">
                                    Featured Formula
                                </p>
                                <p className="text-[10px] sm:text-sm font-serif italic text-stone-800">
                                    "A revelation in skin texture and clarity."
                                </p>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex gap-2 sm:gap-4 z-30">
                        <button
                            onClick={() => handleStep(-1)}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-stone-200 bg-white/50 backdrop-blur-md text-stone-800 hover:bg-stone-900 hover:text-white transition-all rounded-full"
                        >
                            <HiOutlineArrowNarrowLeft size={18} sm={20} />
                        </button>
                        <button
                            onClick={() => handleStep(1)}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-stone-200 bg-white/50 backdrop-blur-md text-stone-800 hover:bg-stone-900 hover:text-white transition-all rounded-full"
                        >
                            <HiOutlineArrowNarrowRight size={18} sm={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Side Progress */}
            <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-4">
                {banners.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`h-8 sm:h-12 w-[2px] transition-all duration-500 ${idx === currentIndex ? "bg-stone-800" : "bg-stone-200"}`}
                    />
                ))}
            </div>
        </section>
    );
}