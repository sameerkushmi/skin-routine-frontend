"use client";

import { motion } from "framer-motion";

export default function PremiumMarquee() {
    const items = [
        "Free shipping on orders over $50",
        "100% Natural Ingredients",
        "Exclusive Offers Every Week",
        "Premium Quality Guaranteed",
        "Secure Payments",
    ];

    return (
        <div className="relative w-full overflow-hidden border-y border-white/5 bg-[#0a0a0a] py-4 shadow-2xl">
            {/* Premium Glass Overlay - Subtle lighting effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#ffffff08,transparent)]" />

            {/* Sophisticated Fade Gradients */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a/80] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a/80] to-transparent" />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 35, // Slower is often perceived as more "expensive"
                }}
            >
                {/* Render twice for seamless loop */}
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <span className="mx-8 text-xs font-light uppercase tracking-[0.25em] text-zinc-300 transition-colors hover:text-white sm:text-sm">
                                    {item}
                                </span>
                                {/* Custom geometric separator instead of a bullet */}
                                <div className="h-1 w-1 rotate-45 bg-amber-400/40" />
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}