"use client";

import { motion } from "framer-motion";
import { FiEye, FiHeart, FiUsers } from "react-icons/fi";
import { PiLeaf } from "react-icons/pi";

const values = [
    {
        icon: <FiEye />,
        title: "Radical Transparency",
        description: "Every botanical extract and clinical active is disclosed. We believe beauty shouldn't be a mystery, but a conscious choice.",
    },
    {
        icon: <FiHeart />,
        title: "Ethical Sourcing",
        description: "Our ingredients are hand-selected from fair-trade cooperatives that protect both the land and the hands that harvest.",
    },
    {
        icon: <PiLeaf />,
        title: "Eco-Conscious Luxury",
        description: "Formulated without compromise. Our packaging is designed for circularity, ensuring elegance doesn't leave a footprint.",
    },
    {
        icon: <FiUsers />,
        title: "Holistic Wellness",
        description: "Skincare is self-care. We craft rituals that harmonize your skin's health with your mental and emotional equilibrium.",
    },
];

export default function CoreValues() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section className="py-10 bg-[#FCFBFA] border-y border-stone-100">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header: Editorial Style */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
                >
                    <div className="max-w-xl">
                        <motion.span
                            variants={itemVariants}
                            className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-bold block mb-4"
                        >
                            The Pillars
                        </motion.span>
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-serif italic text-stone-900 leading-[1.1]"
                        >
                            Our Commitments <br />
                            <span className="font-sans not-italic font-light text-stone-400">to Quality & Earth.</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        variants={itemVariants}
                        className="text-stone-500 max-w-sm text-sm leading-relaxed"
                    >
                        We adhere to a strict set of standards that go beyond industry regulations,
                        ensuring every drop is as pure as it is potent.
                    </motion.p>
                </motion.div>

                {/* Values Grid: Border-locked layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-stone-200"
                >
                    {values.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group p-10 border-r border-b border-stone-200 transition-colors duration-500 hover:bg-stone-50"
                        >
                            <div className="text-stone-400 text-2xl mb-12 group-hover:text-stone-900 transition-colors duration-500">
                                {item.icon}
                            </div>

                            <div className="mb-6">
                                <span className="text-[10px] font-mono text-stone-300 block mb-2 italic">0{index + 1}—</span>
                                <h3 className="text-lg font-medium tracking-tight text-stone-800 group-hover:translate-x-1 transition-transform duration-500">
                                    {item.title}
                                </h3>
                            </div>

                            <p className="text-stone-500 text-sm leading-relaxed font-light">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Brand Sign-off */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <p className="text-[10px] tracking-[0.3em] uppercase text-stone-300">
                        Crafted with integrity &bull; Tested for excellence
                    </p>
                </motion.div>
            </div>
        </section>
    );
}