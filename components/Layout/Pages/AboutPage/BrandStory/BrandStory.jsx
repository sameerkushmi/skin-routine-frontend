"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const milestones = [
    {
        year: "2023",
        title: "The Genesis",
        description: "Born in a small atelier with a single goal: to prove that botanical purity and clinical results could coexist.",
    },
    {
        year: "2024",
        title: "The Petal Infusion",
        description: "Our signature moisturizer launched, utilizing a proprietary cold-press method to preserve active nutrients.",
    },
    {
        year: "2025",
        title: "Green Excellence",
        description: "Honored with the 'Sustainable Innovation Award' for our zero-waste packaging and ethical sourcing.",
    },
    {
        year: "2026",
        title: "Global Presence",
        description: "From Paris to Tokyo, our philosophy of 'Skin Minimalism' reached beauty enthusiasts across 14 countries.",
    },
];

export default function BrandStory() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="py-10 bg-[#FAF9F6] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-32 flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-4"
                    >
                        Legacy & Vision
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif italic text-stone-900 text-center"
                    >
                        Our Journey Through Time
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* The Animated "Thread" */}
                    <motion.div
                        style={{ scaleY }}
                        className="absolute left-0 md:left-1/2 top-0 w-[1px] h-full bg-stone-300 origin-top transform md:-translate-x-1/2"
                    />

                    <div className="space-y-24 md:space-y-40">
                        {milestones.map((item, index) => (
                            <div key={item.year} className="relative">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content Area */}
                                    <div className={`w-full md:w-[42%] ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                        }`}>
                                        <span className="text-3xl font-serif italic text-stone-300 mb-4 block">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl tracking-tight font-light text-stone-900 mb-4 uppercase tracking-[0.1em]">
                                            {item.title}
                                        </h3>
                                        <p className="text-stone-500 font-light leading-relaxed text-balance">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* The Center Point */}
                                    <div className="absolute left-[-4px] md:left-1/2 top-0 md:top-10 w-2 h-2 rounded-full bg-stone-900 transform md:-translate-x-1/2 ring-8 ring-[#FAF9F6]" />

                                    {/* Decorative Empty Space for Desktop */}
                                    <div className="hidden md:block w-[42%]" />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}