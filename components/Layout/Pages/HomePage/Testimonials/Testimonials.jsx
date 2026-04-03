"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PiStarFill, PiQuotesFill } from "react-icons/pi";

const reviews = [
    {
        name: "Aarushi Sharma",
        role: "Verified Buyer",
        image: "/images/homepage/testimonials/44.jpg",
        rating: 5,
        review: "Absolutely love the quality! The products feel premium and delivery was super fast. Highly recommended!",
    },
    {
        name: "Neha Kapoor",
        role: "Beauty Enthusiast",
        image: "/images/homepage/testimonials/65.jpg",
        rating: 5,
        review: "The skincare range is amazing. My skin feels healthier and glowing after just a few days of my new ritual.",
    },
    {
        name: "Ritika Malhotra",
        role: "Fashion Blogger",
        image: "/images/homepage/testimonials/32.jpg",
        rating: 5,
        review: "Beautiful packaging, great prices, and outstanding customer service. I keep coming back for the glow!",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-[#FFF8F9] py-24 relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-10 right-[10%] w-64 h-64 bg-rose-100 rounded-full blur-[100px]" />
                <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-pink-100 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-pink-400/80 block mb-4">
                        Real Experiences
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-stone-800 leading-tight">
                        Voices of <span className="italic font-light text-pink-300">Radiance</span>
                    </h2>
                </motion.div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {reviews.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative bg-white/40 backdrop-blur-sm border border-white rounded-[40px] p-10 hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-pink-100/30 group"
                        >
                            {/* Accent Quote Icon */}
                            <PiQuotesFill className="absolute top-8 right-10 text-pink-50 text-6xl group-hover:text-pink-100 transition-colors duration-500" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <PiStarFill
                                        key={i}
                                        className={`text-xs ${i < item.rating ? "text-pink-300" : "text-stone-200"}`}
                                    />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-stone-600 text-lg font-light leading-relaxed mb-10 italic relative z-10">
                                “{item.review}”
                            </p>

                            {/* User Profile */}
                            <div className="flex items-center gap-4 border-t border-stone-100 pt-8">
                                <div className="relative w-14 h-14">
                                    <Image
                                        fill
                                        src={item.image}
                                        alt={item.name}
                                        className=" rounded-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 ring-4 ring-white shadow-sm"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-pink-400 rounded-full border-2 border-white flex items-center justify-center">
                                        <PiStarFill className="text-[8px] text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-serif text-lg text-stone-800 tracking-tight">
                                        {item.name}
                                    </h4>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                                        {item.role}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}