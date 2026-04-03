"use client";

import { motion } from "framer-motion";

const reviews = [
    {
        name: "Emma Laurent",
        title: "Verified Muse",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        quote: "My skin has never felt this calm and radiant. I love knowing exactly what ingredients I’m using—it feels like a ritual of self-respect.",
    },
    {
        name: "Daniel Moore",
        title: "Wellness Creator",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        quote: "The textures, the results, the philosophy—this brand truly understands skin minimalism. I recommend it without reservation.",
    },
    {
        name: "Sophia Chen",
        title: "Eco-Enthusiast",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        quote: "Visible results within weeks. The fact that it’s cruelty-free and sustainably packaged makes the luxury feel even deeper.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-10 bg-[#FFF9F9] relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Editorial Header */}
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] tracking-[0.5em] uppercase text-pink-300 font-bold block mb-4"
                    >
                        Voice of the Community
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif italic text-stone-900"
                    >
                        Shared <span className="font-sans not-italic font-light text-stone-400">Radiance.</span>
                    </motion.h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                delay: idx * 0.2,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            viewport={{ once: true }}
                            className={`relative p-10 bg-white/60 backdrop-blur-sm border border-pink-50 rounded-3xl ${idx === 1 ? "md:-translate-y-8" : "" // Staggered height effect
                                }`}
                        >
                            {/* Subtle Star Badge */}
                            <div className="flex justify-between items-start mb-12">
                                <span className="text-[10px] tracking-widest uppercase font-bold text-pink-200">
                                    Rating: 5.0
                                </span>
                                <span className="text-4xl font-serif text-pink-100 leading-none">“</span>
                            </div>

                            <p className="text-stone-600 font-light italic leading-relaxed text-lg mb-10">
                                {review.quote}
                            </p>

                            <div className="flex items-center gap-4 border-t border-pink-50 pt-8">
                                <div className="relative">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full object-cover grayscale-[30%]"
                                    />
                                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium tracking-tight text-stone-900">{review.name}</h4>
                                    <p className="text-[10px] uppercase tracking-widest text-pink-300">{review.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Social Proof Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 text-center"
                >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400">
                        Join 50,000+ members of our <span className="text-pink-300">#GlowRitual</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}