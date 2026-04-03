"use client";

import { useState } from "react";
import { FiSearch, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";


export default function BlogFilters({ onCategoryChange, onSearch, blogs }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (onCategoryChange) onCategoryChange(category);
    };

    const categories = ["All", ...new Set(blogs.map(blog => blog.category))]

    return (
        <div className="max-w-7xl mx-auto mb-16 px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-6">

                {/* Categories Navigation */}
                <div className="relative group">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-4">
                        Filter by Interest
                    </p>
                    <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`relative pb-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${activeCategory === category
                                    ? "text-slate-900"
                                    : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                {category}
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-400"
                                    />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Refined Search Bar */}
                <div className="relative w-full md:w-80 group">
                    <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-400 transition-colors" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (onSearch) onSearch(e.target.value);
                        }}
                        placeholder="Search our journal..."
                        className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-slate-200 focus:border-pink-400 outline-none text-sm transition-all placeholder:text-slate-300 placeholder:font-light"
                    />
                </div>
            </div>

            {/* Context Breadcrumb / Result Count Placeholder */}
            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <span>The Journal</span>
                <FiChevronRight size={10} />
                <span className="text-pink-500 uppercase tracking-wider">{activeCategory}</span>
            </div>
        </div>
    );
}