"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const milestones = [
    {
        year: "2023",
        title: "Brand Started",
        description:
            "We started with one simple goal: to create skincare products that are natural, safe, and effective for everyone.",
    },
    {
        year: "2024",
        title: "First Bestseller",
        description:
            "Our best-selling moisturizer launched with natural ingredients that help keep skin soft, fresh, and healthy.",
    },
    {
        year: "2025",
        title: "Eco Friendly Growth",
        description:
            "We received recognition for using sustainable packaging and responsible sourcing for our skincare products.",
    },
    {
        year: "2026",
        title: "Worldwide Customers",
        description:
            "Our skincare brand reached customers in many countries who trust our products for healthy glowing skin.",
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
        restDelta: 0.001,
    });

    return (
        <section
            ref={containerRef}
            className="py-10 bg-[#FAF9F6] overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-32 flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-4"
                    >
                        Our Story
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-stone-900 text-center"
                    >
                        Our Journey Through the Years
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
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
                                    className={`flex flex-col md:flex-row items-center justify-between ${index % 2 === 0
                                            ? "md:flex-row"
                                            : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content */}
                                    <div
                                        className={`w-full md:w-[42%] ${index % 2 === 0
                                                ? "md:text-right"
                                                : "md:text-left"
                                            }`}
                                    >
                                        <span className="text-3xl font-serif text-stone-300 mb-4 block">
                                            {item.year}
                                        </span>

                                        <h3 className="text-xl font-semibold text-stone-900 mb-4 uppercase tracking-[0.1em]">
                                            {item.title}
                                        </h3>

                                        <p className="text-stone-500 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="absolute left-[-4px] md:left-1/2 top-0 md:top-10 w-2 h-2 rounded-full bg-stone-900 transform md:-translate-x-1/2 ring-8 ring-[#FAF9F6]" />

                                    {/* Empty Space */}
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