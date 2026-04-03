"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";

const BlogNotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 bg-white">
            <div className="relative max-w-lg w-full text-center">

                {/* Background Decorative Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stone-50 rounded-full blur-3xl -z-10" />

                {/* Animated Icon Container */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 0, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-[2.5rem] bg-white shadow-xl shadow-stone-200/50 border border-stone-50 text-4xl"
                >
                    <span className="grayscale opacity-80">🕵️‍♂️</span>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-3xl font-black text-stone-900 mb-3 tracking-tight">
                        Story Untraceable
                    </h2>

                    <p className="text-stone-500 text-base mb-10 leading-relaxed max-w-xs mx-auto font-light">
                        This article seems to have vanished into the archives or never existed at all.
                    </p>
                </motion.div>

                {/* Refined Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl text-stone-500 font-semibold text-sm hover:text-stone-900 hover:bg-stone-50 transition-all duration-300"
                    >
                        <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Return Back
                    </button>

                    <Link
                        href="/blogs"
                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition-all duration-300 shadow-lg shadow-stone-200 active:scale-95"
                    >
                        <FiBookOpen />
                        Browse Feed
                    </Link>
                </motion.div>

                {/* Subtle Footer Suggestion */}
                <div className="mt-16 pt-8 border-t border-stone-100">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300">
                        Error Code: 404 / Blog_Missing
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogNotFound;