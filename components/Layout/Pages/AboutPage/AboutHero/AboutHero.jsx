"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function AboutHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax effect for the background image
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
        },
    };

    return (
        <header
            ref={containerRef}
            className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#121212]"
            role="banner"
        >
            {/* Background Image with Parallax & Scale Entrance */}
            <motion.div
                style={{ y, opacity }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute inset-0"
            >
                <img
                    src="/images/aboutpage/hero-section/bg.jpeg"
                    alt="Luxury skincare editorial"
                    className="w-full h-full object-cover grayscale-[20%]"
                />
                {/* Refined Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#121212]" />
                <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Content Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-6 max-w-5xl"
            >
                <motion.span
                    variants={fadeInUp}
                    className="inline-block text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-300 mb-6"
                >
                    The Art of Apothecary
                </motion.span>

                <motion.h1
                    variants={fadeInUp}
                    className="text-5xl md:text-8xl font-serif text-white italic leading-[1.1] mb-8"
                >
                    Nurture Your <br />
                    <span className="font-sans not-italic font-light tracking-tight">Natural Glow</span>
                </motion.h1>

                <motion.p
                    variants={fadeInUp}
                    className="text-balance text-lg md:text-xl text-stone-200/80 mb-10 font-light max-w-2xl mx-auto leading-relaxed italic"
                >
                    Rare botanicals. Clinically proven. <br className="hidden md:block" />
                    Experience the future of organic radiance.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/shop"
                        className="group relative px-10 py-4 overflow-hidden border border-white/30 bg-white/10 backdrop-blur-md text-white transition-all duration-500 hover:border-white"
                    >
                        <span className="relative z-10 text-sm tracking-widest uppercase font-semibold">
                            Explore Collection
                        </span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                        <span className="absolute inset-0 z-10 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm tracking-widest uppercase font-semibold">
                            Explore Collection
                        </span>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-stone-400 to-transparent" />
            </motion.div>
        </header>
    );
}