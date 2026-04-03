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
        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top on page change
    };

    return (
        <div id="blogs" className="max-w-7xl mx-auto px-6 mb-24">
            {/* Posts Grid/List */}
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4"}>
                {currentPosts.map((post, index) => (
                    <motion.div
                        key={post.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`group flex flex-col ${layout === "list" ? "md:flex-row md:items-start gap-8" : "w-full"}`}
                    >
                        {/* Image Wrap */}
                        <div
                            className={`relative overflow-hidden rounded-[1.5rem] bg-slate-100 transition-all duration-500 shadow-sm group-hover:shadow-xl ${layout === "list" ? "md:w-2/5 aspect-[4/3]" : "aspect-[16/10] mb-6"
                                }`}
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
                            <div className="flex items-center gap-3 text-slate-400 text-[11px] uppercase tracking-wider mb-3">
                                <span>{post.date}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span>By Skin Routine</span>
                            </div>

                            <Link href={`/blog/${post._id}`} className="block group/title">
                                <h3 className="text-xl md:text-2xl font-serif text-slate-900 leading-tight mb-3 transition-colors group-hover/title:text-pink-500">
                                    {post.title}
                                </h3>
                            </Link>

                            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 line-clamp-2 font-light">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                <Link
                                    href={`/blog/${post._id}`}
                                    className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-pink-500 transition-colors"
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
                <div className="flex justify-center mt-12 gap-3 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${page === currentPage
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
