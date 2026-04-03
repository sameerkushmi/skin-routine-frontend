"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Creates a smooth spring animation for the progress ring
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button earlier for better UX in long documents
            setVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-10 right-10 z-50 flex items-center justify-center group"
                    aria-label="Scroll to top"
                >
                    {/* Progress Ring (SVG) */}
                    <svg className="w-14 h-14 transform -rotate-90">
                        <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="transparent"
                            className="text-stone-200"
                        />
                        <motion.circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="transparent"
                            strokeDasharray="100 100"
                            style={{ pathLength: scrollYProgress }}
                            className="text-stone-800"
                        />
                    </svg>

                    {/* Icon/Text Container */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 group-hover:text-rose-500 transition-colors duration-300">
                            Top
                        </span>
                        {/* Simple Minimalist Arrow */}
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            className="mt-0.5 text-stone-400 group-hover:text-rose-500 transition-colors duration-300"
                        >
                            <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}