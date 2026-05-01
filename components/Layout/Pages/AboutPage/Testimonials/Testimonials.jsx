"use client";

import { motion } from "framer-motion";

const reviews = [
    {
        name: "Emma Laurent",
        title: "Verified Customer",
        quote:
            "My skin feels softer, healthier, and more glowing than ever before. I also love knowing exactly which ingredients I am using.",
    },
    {
        name: "Daniel Moore",
        title: "Happy Customer",
        quote:
            "The product quality, smooth texture, and visible results are amazing. I highly recommend this skincare brand.",
    },
    {
        name: "Sophia Chen",
        title: "Regular Buyer",
        quote:
            "I saw real results in just a few weeks. I also love that the products are cruelty free and eco friendly.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-10 bg-[#FFF9F9] relative overflow-hidden">
            {/* Background Shape */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Heading */}
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] tracking-[0.5em] uppercase text-pink-300 font-bold block mb-4"
                    >
                        Customer Reviews
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif text-stone-900"
                    >
                        Trusted by <span className="font-sans font-light text-stone-400">Customers</span>
                    </motion.h2>
                </div>

                {/* Review Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                delay: idx * 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            viewport={{ once: true }}
                            className={`relative shadow-lg p-10 bg-white/60 backdrop-blur-sm border border-pink-50 rounded-3xl ${idx === 1 ? "md:-translate-y-8" : ""
                                }`}
                        >
                            {/* Rating */}
                            <div className="flex justify-between items-start mb-12">
                                <span className="text-[10px] tracking-widest uppercase font-bold text-pink-300">
                                    Rating: 5.0
                                </span>

                                <span className="text-4xl font-serif text-pink-100 leading-none">
                                    “
                                </span>
                            </div>

                            <p className="text-stone-600 font-light italic leading-relaxed text-lg mb-10">
                                {review.quote}
                            </p>

                            <div className="flex items-center gap-4 border-t border-pink-50 pt-8">
                                <div>
                                    <h4 className="text-sm font-medium tracking-tight text-stone-900">
                                        {review.name}
                                    </h4>

                                    <p className="text-[10px] uppercase tracking-widest text-pink-300">
                                        {review.title}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 text-center"
                >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400">
                        Join 50,000+ happy customers
                    </p>
                </motion.div>
            </div>
        </section>
    );
}