"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiShield, FiLock, FiRotateCcw } from "react-icons/fi";

const TrustStrip = () => {
    const trustItems = [
        { title: "Cruelty-Free", icon: <FiCheckCircle /> },
        { title: "Dermatologist Tested", icon: <FiShield /> },
        { title: "Secure Checkout", icon: <FiLock /> },
        { title: "Easy Returns", icon: <FiRotateCcw /> },
    ];

    return (
        <section className="bg-white border-y border-stone-100 py-6 sm:py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center sm:justify-between items-center gap-y-6 gap-x-6">
                {trustItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 sm:gap-4 group"
                    >
                        <div className="text-rose-300 text-lg sm:text-xl transition-colors duration-300 group-hover:text-rose-400">
                            {item.icon}
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 group-hover:text-stone-900 transition-colors duration-300">
                            {item.title}
                        </span>

                        {/* Decorative divider for desktop, hidden on last item */}
                        {index !== trustItems.length - 1 && (
                            <div className="hidden sm:block h-4 w-[1px] bg-stone-200 ml-4" />
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TrustStrip;