"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ShopHero() {
    const ref = useRef(null);

    // Track scroll
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section
            ref={ref}
            className="relative h-[50vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
        >
            {/* PARALLAX IMAGE */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/shoppage/hero-section/shop-banner.jpg"
                    alt="Luxury skincare banner"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </motion.div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
                >
                    Formulated <br />
                    <span className="italic font-light text-white/80">
                        with Intention
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.9 }}
                    className="mt-4 max-w-xl mx-auto text-sm md:text-base font-light text-white/80"
                >
                    Dermatologist-approved skincare crafted for the modern ritual.
                    Clean science meets botanical luxury.
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-6 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                        Explore Collection
                    </span>
                </motion.div>
            </div>
        </section>
    );
}