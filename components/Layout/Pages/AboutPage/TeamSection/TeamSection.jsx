"use client";

import { motion } from "framer-motion";

const team = [
    {
        name: "Emma Laurent",
        role: "Founder & CEO",
        image: "/images/aboutpage/team-section/emma.jpeg",
        bio: "Emma founded the brand to bridge the gap between clinical efficacy and botanical purity."
    },
    {
        name: "Daniel Moore",
        role: "Head of Formulation",
        image: "/images/aboutpage/team-section/daniel.jpeg",
        bio: "A chemist by trade, Daniel ensures every drop meets our 'gold-standard' potency."
    },
    {
        name: "Sophia Chen",
        role: "Sustainability Lead",
        image: "/images/aboutpage/team-section/sophia.jpeg",
        bio: "Sophia manages our zero-waste initiatives and ethical global sourcing partnerships."
    },
    {
        name: "Olivia Brooks",
        role: "Creative Director",
        image: "/images/aboutpage/team-section/olivia.jpeg",
        bio: "Olivia shapes the visual narrative and wellness philosophy of our community."
    }
];

export default function TeamSection() {
    return (
        <section className="py-10 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Editorial Header */}
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b border-stone-200 pb-10">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-serif italic text-stone-900"
                    >
                        The Hands <span className="font-sans not-italic font-light text-stone-400">& Minds</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-stone-500 max-w-xs text-sm uppercase tracking-widest mt-4 md:mt-0"
                    >
                        Guided by expertise, driven by botanical passion.
                    </motion.p>
                </div>

                {/* Team Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[3/4] overflow-hidden bg-stone-200"
                        >
                            {/* Portrait Image */}
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Content Over Image */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="overflow-hidden">
                                    <motion.p
                                        className="text-[10px] uppercase tracking-[0.3em] text-stone-300 mb-2 translate-y-0 group-hover:translate-y-0 transition-transform"
                                    >
                                        {member.role}
                                    </motion.p>
                                    <h3 className="text-2xl font-serif italic text-white mb-4">
                                        {member.name}
                                    </h3>
                                </div>

                                {/* Hidden Bio - Slide up on Hover */}
                                <div className="h-0 group-hover:h-20 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                                    <p className="text-sm text-stone-200 font-light leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 flex justify-center"
                >
                    <button className="text-xs uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors border-b border-stone-200 pb-2">
                        Join our atelier
                    </button>
                </motion.div>
            </div>
        </section>
    );
}