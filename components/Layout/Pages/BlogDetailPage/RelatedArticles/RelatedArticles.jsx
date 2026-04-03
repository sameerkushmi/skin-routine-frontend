"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import api from "@/components/utils/Api/api";

export default function RelatedArticles({ id }) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchRelatedPosts = async () => {
        try {
            const { data } = await api.get(`/blogs/related/${id}`);
            console.log(data);
            setPosts(data.relatedBlogs);
        } catch (error) {
            console.error("Failed to fetch related posts:", error);
        } finally {
            setLoading(false)

        }
    };

    useEffect(() => {
        fetchRelatedPosts();
    }, [])

    if (posts.length === 0 || loading) return null

    return (
        <section className="max-w-7xl mx-auto px-6 mt-32 mb-40">
            {/* Elegant Header */}
            <div className="text-center mb-16">
                <span className="text-[10px] uppercase tracking-[0.4em] text-pink-500 font-bold mb-4 block">
                    Curated For You
                </span>
                <h3 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
                    Continue Reading
                </h3>
                <div className="w-12 h-[2px] bg-slate-200 mx-auto mt-8" />
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                {posts.map((post, idx) => (
                    <motion.div
                        key={post.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                    >
                        <Link href={`/blog/${post._id}`} className="group block">
                            {/* Image with Soft Mask */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6">
                                <Image
                                    src={post.heroImage.url}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                />
                                {/* Bottom Inner Glow/Shadow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content Section */}
                            <div className="space-y-3 px-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                                        {post.tags?.[0] || "Lifestyle"}
                                    </span>
                                    <span className="h-px w-4 bg-slate-200" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                                        {post.readTime || "5 Min"}
                                    </span>
                                </div>

                                <h4 className="text-xl md:text-2xl font-serif text-slate-900 leading-snug transition-colors group-hover:text-pink-500">
                                    {post.title}
                                </h4>

                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-light">
                                    {post.excerpt}
                                </p>

                                <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:gap-4 transition-all duration-300">
                                    Full Story
                                    <FiArrowRight className="text-pink-400" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}