"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function BlogDetailHero({ title, excerpt, date, heroImage, heroVideo }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax effect: Background moves slower than scroll
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-slate-900"
        >
            {/* Background Media Container */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                {heroVideo ? (
                    <video
                        src={heroVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover scale-105"
                    />
                ) : (
                    heroImage && (
                        <Image
                            src={heroImage}
                            alt={title}
                            fill
                            priority
                            className="object-cover object-center scale-105"
                        />
                    )
                )}
                {/* Premium Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
            </motion.div>

            {/* Centered Content Section */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Category or Breadcrumb Tag */}
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-pink-400 font-bold mb-6 block">
                        Exclusive Journal
                    </span>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-8 drop-shadow-2xl">
                        {title}
                    </h1>

                    {excerpt && (
                        <p className="text-white/80 text-sm md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                            {excerpt}
                        </p>
                    )}

                    {/* Sophisticated Meta Data */}
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <div className="flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs md:text-sm">
                            <FiUser className="text-pink-400" />
                            <span className="font-medium">Skine Routine</span>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs md:text-sm">
                            <FiCalendar className="text-pink-400" />
                            <span className="font-medium">{date}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
}