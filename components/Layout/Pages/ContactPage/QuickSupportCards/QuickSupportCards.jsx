"use client";

import { motion } from "framer-motion";
import { FiPackage, FiRotateCw, FiInfo, FiUsers } from "react-icons/fi";

const QuickSupportCards = () => {
    const cards = [
        {
            title: "Order & Shipping",
            icon: <FiPackage />,
            desc: "Track and manage your glow delivery."
        },
        {
            title: "Returns & Refunds",
            icon: <FiRotateCw />,
            desc: "30-day satisfaction guarantee."
        },
        {
            title: "Product & Ingredients",
            icon: <FiInfo />,
            desc: "Clean formulation details."
        },
        {
            title: "Partnerships",
            icon: <FiUsers />,
            desc: "Join our skincare community."
        },
    ];

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-14 gap-4">
                    <div className="max-w-md">
                        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-rose-400 uppercase mb-2 block">
                            Self-Service
                        </span>

                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-stone-900 tracking-tight">
                            Quick <span className="italic font-serif">Support</span>
                        </h2>
                    </div>

                    <p className="text-stone-500 text-sm md:text-base font-light leading-relaxed max-w-sm">
                        Find answers instantly in our help library.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-px bg-stone-100 border border-stone-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">

                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="group flex flex-col justify-between p-4 sm:p-5 md:p-8 bg-white hover:bg-[#FCFBF9] transition-all duration-300"
                        >
                            <div>
                                {/* Icon */}
                                <div className="text-rose-400 text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 transition-transform duration-300 group-hover:-rotate-12">
                                    {card.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-sm sm:text-base md:text-lg font-medium text-stone-800 mb-1 md:mb-2 tracking-tight">
                                    {card.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs sm:text-sm text-stone-400 font-light leading-snug md:leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default QuickSupportCards;