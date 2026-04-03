"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const categories = [
    {
        title: "Cleansers",
        subtitle: "Purify & Refresh",
        mobileImage: "/images/homepage/category/mobile/cleanser.jpg",
        desktopImage: "/images/homepage/category/desktop/cleanser.jpg",
        link: "/shop?category=cleanser",
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        title: "sunscreen",
        subtitle: "Deep Treatment",
        mobileImage: "/images/homepage/category/mobile/sunscreen.jpg",
        desktopImage: "/images/homepage/category/desktop/sunscreen.jpg",
        link: "/shop?category=sunscreen",
        gridClass: "md:col-span-2 md:row-span-1",
    },
    {
        title: "Cream",
        subtitle: "Balance Skin",
        mobileImage: "/images/homepage/category/mobile/cream.jpg",
        desktopImage: "/images/homepage/category/desktop/cream.jpg",
        link: "/shop?category=cream",
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        title: "Moisturizers",
        subtitle: "Lock in Hydration",
        mobileImage: "/images/homepage/category/mobile/moisturizer.jpg",
        desktopImage: "/images/homepage/category/desktop/moisturizer.jpg",
        link: "/shop?category=moisturizer",
        gridClass: "md:col-span-2 md:row-span-1",
    },
];

export default function FeaturedCategories() {
    return (
        <section className="bg-[#FDFCFB] py-16 md:py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-3">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[10px] uppercase tracking-[0.4em] text-pink-400 font-bold block"
                        >
                            Curated Rituals
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
                            Shop by <span className="italic font-light text-stone-400">Category</span>
                        </h2>
                    </div>

                    <Link
                        href="/shop"
                        className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-2 hover:border-pink-400 transition-all"
                    >
                        Explore All Collections
                        <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </header>

                {/* MOBILE */}
                <div className="flex md:hidden gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
                    {categories.map((cat, index) => (
                        <Link
                            key={index}
                            href={cat.link}
                            className="flex-shrink-0 w-[60vw] snap-center group"  // ↓ smaller
                        >
                            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-stone-100 mb-4 shadow-sm"> {/* ↓ smaller */}
                                <Image
                                    src={cat.mobileImage}
                                    alt={cat.title}
                                    fill
                                    sizes="60vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">{cat.subtitle}</p>
                                    <p className="text-xl font-serif">{cat.title}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* DESKTOP */}
                <div className="hidden md:grid grid-cols-6 grid-rows-2 gap-4 h-[500px]"> {/* ↓ smaller */}
                    {categories.map((cat, index) => (
                        <Link
                            key={index}
                            href={cat.link}
                            className={`group relative overflow-hidden rounded-[2.5rem] bg-stone-100 ${cat.gridClass}`}
                        >
                            <Image
                                src={cat.desktopImage}
                                alt={cat.title}
                                fill
                                sizes="(max-width: 1280px) 33vw, 25vw"
                                className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                            />

                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />

                            <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"> {/* ↓ tighter */}
                                <motion.div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 translate-y-2 group-hover:translate-y-0 transition-transform">
                                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/80 font-bold block mb-1">
                                        {cat.subtitle}
                                    </span>
                                    <h3 className="text-2xl font-semibold font-serif text-white">
                                        {cat.title}
                                    </h3>

                                    <div className="mt-4 h-[1px] w-0 bg-white group-hover:w-full transition-all duration-700 opacity-50" />
                                </motion.div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}