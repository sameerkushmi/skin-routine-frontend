"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function BlogGrid({ posts, layout = "grid", postsPerPage = 6 }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 md:mb-24">
            {/* Posts Grid/List */}
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8`}>
                {currentPosts.map((post, index) => (
                    <motion.div
                        key={post.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`group flex flex-col ${layout === "list" ? "md:flex-row md:items-start gap-6 sm:gap-8" : "w-full"}`}
                    >
                        {/* Image Wrap */}
                        <div
                            className={`relative overflow-hidden rounded-xl sm:rounded-[1.5rem] bg-slate-100 transition-all duration-500 shadow-sm group-hover:shadow-xl 
                            ${layout === "list" ? "md:w-2/5 aspect-[4/3]" : "w-full aspect-[4/3] sm:aspect-[16/10] mb-4 sm:mb-6"}`}
                        >
                            <Link href={`/blog/${post._id}`}>
                                <Image
                                    src={post.heroImage.url}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </Link>
                        </div>

                        {/* Content Wrap */}
                        <div className={`${layout === "list" ? "md:w-3/5 pt-2" : "w-full"}`}>
                            <div className="flex items-center gap-2 sm:gap-3 text-slate-400 text-[10px] sm:text-[11px] uppercase tracking-wider mb-2 sm:mb-3">
                                <span>{post.date}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span>By Skin Routine</span>
                            </div>

                            <Link href={`/blog/${post._id}`} className="block group/title">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-slate-900 leading-tight mb-2 sm:mb-3 transition-colors group-hover/title:text-pink-500">
                                    {post.title}
                                </h3>
                            </Link>

                            <p className="text-slate-500 text-sm sm:text-base md:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-2 font-light">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-2 sm:pt-4 border-t border-slate-50">
                                <Link
                                    href={`/blog/${post._id}`}
                                    className="flex items-center gap-1 text-sm sm:text-sm font-bold text-slate-900 hover:text-pink-500 transition-colors"
                                >
                                    Read Article
                                    <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 sm:mt-12 gap-2 sm:gap-3 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition ${page === currentPage
                                ? "bg-pink-500 text-white"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-pink-50"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}