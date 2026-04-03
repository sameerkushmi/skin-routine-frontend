"use client";

import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function PremiumPagination({ currentPage, totalPages, setCurrentPage }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col items-center gap-8 mt-24 mb-16">

            {/* 1. PROGRESS INDICATOR */}
            <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">
                    Page {currentPage} <span className="mx-2 text-stone-200">/</span> {totalPages}
                </span>
                <div className="w-48 h-[1px] bg-stone-100 relative overflow-hidden">
                    <motion.div
                        initial={false}
                        animate={{ x: `${(currentPage - 1) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="absolute inset-0 w-full h-full bg-stone-900 origin-left scale-x-[0.33]" // Adjust scale-x based on totalPages
                        style={{ transformOrigin: 'left', scaleX: 1 / totalPages }}
                    />
                </div>
            </div>

            {/* 2. NAVIGATION CONTROLS */}
            <div className="flex items-center gap-12">
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="group flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-stone-900 disabled:text-stone-300 disabled:cursor-not-allowed transition-colors"
                >
                    <FiArrowLeft className="transition-transform group-hover:-translate-x-1" size={16} />
                    <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Numbered Dots */}
                <div className="flex items-center gap-4">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className="relative py-2 px-1 group"
                        >
                            <span className={`text-xs font-medium transition-colors duration-300 ${currentPage === page ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                                }`}>
                                {page.toString().padStart(2, '0')}
                            </span>
                            {currentPage === page && (
                                <motion.div
                                    layoutId="activePage"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="group flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-stone-900 disabled:text-stone-300 disabled:cursor-not-allowed transition-colors"
                >
                    <span className="hidden sm:inline">Next</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                </button>
            </div>
        </div>
    );
}