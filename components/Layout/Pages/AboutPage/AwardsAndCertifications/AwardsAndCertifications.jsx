"use client";

import { motion } from "framer-motion";
import { FiAward, FiStar, FiShield } from "react-icons/fi";

const pressLogos = ["VOGUE", "ELLE", "BAZAAR", "GLAMOUR", "NYLON"];

const accolades = [
    { category: "Awards", items: ["Best Organic Skincare — 2021", "Innovation in Clean Beauty — 2022", "Editor’s Choice Award — 2023"] },
    { category: "Press", items: ["Vogue Editorial Spotlight", "Elle Top 10 Clean Brands", "Sephora Innovation Partner"] },
    { category: "Trust", items: ["Cruelty-Free Certified", "Eco-Packaging Verified", "Dermatologist Approved"] },
];

export default function AwardsAndCertifications() {
    return (
        <section className="py-10 bg-stone-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Editorial Heading */}
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-bold mb-4"
                    >
                        Esteemed & Verified
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif italic text-stone-900"
                    >
                        A Legacy of <span className="font-sans not-italic font-light text-stone-400">Excellence.</span>
                    </motion.h2>
                </div>

                {/* Press Marquee */}
                <div className="mb-32 relative">
                    <div className="flex justify-around items-center opacity-30 grayscale gap-12 flex-wrap md:flex-nowrap">
                        {pressLogos.map((logo) => (
                            <span key={logo} className="text-2xl md:text-4xl font-serif tracking-tighter hover:opacity-100 transition-opacity cursor-default">
                                {logo}
                            </span>
                        ))}
                    </div>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-stone-300 to-transparent mt-12" />
                </div>

                {/* Accolades Table-Style Grid */}
                <div className="grid md:grid-cols-3 gap-16 md:gap-8">
                    {accolades.map((section, idx) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="h-px w-8 bg-stone-900" />
                                <h3 className="text-xs tracking-[0.3em] uppercase font-bold text-stone-900">
                                    {section.category}
                                </h3>
                            </div>

                            <ul className="space-y-6">
                                {section.items.map((item, i) => (
                                    <li key={i} className="group cursor-default">
                                        <p className="text-lg font-serif italic text-stone-700 group-hover:text-stone-900 transition-colors">
                                            {item}
                                        </p>
                                        <div className="h-px w-0 group-hover:w-full bg-stone-200 transition-all duration-500 mt-2" />
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Seal of Trust - Visual Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-32 flex justify-center gap-12 opacity-40 grayscale contrast-125"
                >
                    {/* These would be your actual Certification SVG Icons */}
                    <div className="flex flex-col items-center gap-2">
                        <FiShield size={40} strokeWidth={1} />
                        <span className="text-[8px] uppercase tracking-widest">Certified Organic</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <FiAward size={40} strokeWidth={1} />
                        <span className="text-[8px] uppercase tracking-widest">Cruelty Free</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <FiStar size={40} strokeWidth={1} />
                        <span className="text-[8px] uppercase tracking-widest">Quality Tested</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}