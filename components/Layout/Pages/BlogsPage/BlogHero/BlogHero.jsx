"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogHero() {
    return (
        <section className="relative bg-[#FFF9F9] pb-12 pt-16 px-4 md:pb-20 md:pt-14">
            <div className="max-w-7xl mx-auto relative">

                {/* Main Banner Container */}
                <div className="relative h-[300px] sm:h-[400px] md:h-[600px] w-full overflow-hidden rounded-[2rem] shadow-2xl">
                    <Image
                        src="/images/blogpage/hero-section/hero.jpg"
                        alt="Beauty Lifestyle Banner"
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Content Card - Positioned Asymmetrically */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 -mt-20 sm:-mt-28 md:-mt-48 ml-auto mr-auto md:mr-12 max-w-xl"
                >
                    <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-pink-500 font-bold mb-3 block">
                            The Beauty Edit
                        </span>

                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-slate-900 leading-[1.1] mb-4 sm:mb-6">
                            Refined <span className="italic font-light">Insights</span>, Tutorials & <span className="text-pink-400">Radiance</span>
                        </h1>

                        <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed font-light">
                            Elevate your daily ritual with curated skincare wisdom and professional beauty techniques, tailored for the modern individual.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                            <Link
                                href="#subscribe"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('subscribe').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full sm:w-auto text-center bg-slate-900 hover:bg-pink-500 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                            >
                                Join the Circle
                            </Link>
                            <Link
                                href="#blogs"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('blogs').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-slate-500 hover:text-pink-500 text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 group"
                            >
                                View Latest Posts
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Decorative Element */}
                <div className="absolute top-10 -left-10 w-28 h-28 sm:w-36 sm:h-36 bg-pink-200/30 rounded-full blur-3xl -z-10" />
            </div>
        </section>
    );
}