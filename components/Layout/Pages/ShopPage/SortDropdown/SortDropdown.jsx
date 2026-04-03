"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const options = [
    { label: "Featured Selection", value: "featured" },
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
];

export default function SortDropdown({ selected, setSelected }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const selectedLabel = options.find((o) => o.value === selected)?.label;

    return (
        <div className="relative inline-block text-left" ref={ref}>
            {/* Minimalist Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="group flex flex-col items-start min-w-[160px] transition-all duration-300"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">
                    Sort By
                </span>
                <div className="flex items-center gap-8 border-b border-stone-200 pb-1 group-hover:border-stone-900 transition-colors w-full justify-between">
                    <span className="text-sm font-medium text-stone-900 italic font-serif">
                        {selectedLabel}
                    </span>
                    <FiChevronDown
                        className={`text-stone-400 transition-transform duration-500 ease-out ${
                            open ? "rotate-180 text-stone-900" : ""
                        }`}
                    />
                </div>
            </button>

            {/* Premium Dropdown Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="absolute right-0 mt-4 w-64 bg-white/80 backdrop-blur-xl border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden z-[100]"
                    >
                        <div className="py-2">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSelected(option.value);
                                        setOpen(false);
                                    }}
                                    className="w-full group flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-stone-50/50"
                                >
                                    <span
                                        className={`text-xs uppercase tracking-widest transition-all ${
                                            selected === option.value
                                                ? "text-stone-900 font-bold translate-x-1"
                                                : "text-stone-500 group-hover:text-stone-900"
                                        }`}
                                    >
                                        {option.label}
                                    </span>
                                    {selected === option.value && (
                                        <motion.div layoutId="check">
                                            <FiCheck className="text-stone-900" size={14} />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}