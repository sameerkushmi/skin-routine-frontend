"use client";

import { motion } from "framer-motion";
import { PiStarFill, PiQuotesFill } from "react-icons/pi";

const reviews = [
    {
        name: "Aarushi Sharma",
        role: "Verified Buyer",
        rating: 5,
        review:
            "I really love the quality. The products feel premium, and delivery was very fast. Highly recommended!",
    },
    {
        name: "Neha Kapoor",
        role: "Happy Customer",
        rating: 5,
        review:
            "The skincare products are amazing. My skin feels fresh, healthy, and glowing after only a few days.",
    },
    {
        name: "Ritika Malhotra",
        role: "Regular Customer",
        rating: 5,
        review:
            "Beautiful packaging, affordable prices, and excellent customer service. I always enjoy shopping here.",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-[#FFF8F9] py-12 sm:py-24 relative overflow-hidden">
            {/* Background Design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-10 right-[10%] w-40 sm:w-64 h-40 sm:h-64 bg-rose-100 rounded-full blur-[80px] sm:blur-[100px]" />
                <div className="absolute bottom-10 left-[10%] w-40 sm:w-64 h-40 sm:h-64 bg-pink-100 rounded-full blur-[80px] sm:blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-20"
                >
                    <span className="text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] font-bold uppercase text-pink-400/80 block mb-3 sm:mb-4">
                        Customer Reviews
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-800 leading-tight">
                        What Our <span className="italic font-light text-pink-300">Customers Say</span>
                    </h2>
                </motion.div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
                    {reviews.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative bg-white/40 backdrop-blur-sm border border-white rounded-[20px] sm:rounded-[40px] p-6 sm:p-10 hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-pink-100/30 group"
                        >
                            {/* Quote Icon */}
                            <PiQuotesFill className="absolute top-4 sm:top-8 right-6 sm:right-10 text-pink-50 text-4xl sm:text-6xl group-hover:text-pink-100 transition-colors duration-500" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4 sm:mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <PiStarFill
                                        key={i}
                                        className={`text-[10px] sm:text-xs ${i < item.rating ? "text-pink-300" : "text-stone-200"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-stone-600 text-sm sm:text-lg font-light leading-relaxed mb-6 sm:mb-10 italic relative z-10">
                                “{item.review}”
                            </p>

                            {/* Customer Info */}
                            <div className="flex items-center gap-3 sm:gap-4 border-t border-stone-100 pt-4 sm:pt-8">
                                <div>
                                    <h4 className="font-serif text-sm sm:text-lg text-stone-800 tracking-tight">
                                        {item.name}
                                    </h4>
                                    <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
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