"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const categories = [
    {
        img: "/images/homepage/category/cleanser.jpg",
        link: "/shop?category=cleanser",
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        img: "/images/homepage/category/sunscreen.jpg",
        mobileImage: "/images/homepage/category/mobile-size/sunscreen.jpg",
        link: "/shop?category=sunscreen",
        link: "/shop?category=sunscreen",
        gridClass: "md:col-span-2 md:row-span-1",
    },
    {
        img: "/images/homepage/category/cream.jpg",
        link: "/shop?category=cream",
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        img: "/images/homepage/category/moisturizer.jpg",
        mobileImage: "/images/homepage/category/mobile-size/moisturizer.jpg",
        link: "/shop?category=moisturizer",
        gridClass: "md:col-span-2 md:row-span-1",
    },
];

export default function FeaturedCategories() {
    return (
        <section className="bg-[#FDFCFB] pt-16 md:py-24 px-4 overflow-hidden">
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
                                    src={cat.mobileImage || cat.img}
                                    alt={`Category ${index + 1}`}
                                    fill
                                    sizes="60vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
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
                                src={cat.img}
                                alt={`Category ${index + 1}`}
                                fill
                                sizes="(max-width: 1280px) 33vw, 25vw"
                                className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                            />

                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
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