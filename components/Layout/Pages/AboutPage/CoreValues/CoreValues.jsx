"use client";

import { motion } from "framer-motion";
import { FiEye, FiHeart, FiUsers } from "react-icons/fi";
import { PiLeaf } from "react-icons/pi";

const values = [
    {
        icon: <FiEye />,
        title: "Full Transparency",
        description:
            "We clearly share every ingredient we use, so customers always know what they are putting on their skin.",
    },
    {
        icon: <FiHeart />,
        title: "Ethical Sourcing",
        description:
            "We choose ingredients from trusted partners who care for people, communities, and the environment.",
    },
    {
        icon: <PiLeaf />,
        title: "Eco Friendly Care",
        description:
            "Our products and packaging are designed to reduce waste while keeping premium quality standards.",
    },
    {
        icon: <FiUsers />,
        title: "Healthy Lifestyle",
        description:
            "We believe skincare is part of self-care, helping you feel confident, refreshed, and healthy every day.",
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
            transition: {
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <section className="py-10 bg-[#FCFBFA] border-y border-stone-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
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
                            Our Values
                        </motion.span>

                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-serif text-stone-900 leading-[1.1]"
                        >
                            Our Promise <br />
                            <span className="font-sans font-light text-stone-400">
                                to Quality & Care
                            </span>
                        </motion.h2>
                    </div>

                    <motion.p
                        variants={itemVariants}
                        className="text-stone-500 max-w-sm text-sm leading-relaxed"
                    >
                        We follow high standards to make sure every product is safe,
                        effective, and made with care for your skin and the planet.
                    </motion.p>
                </motion.div>

                {/* Grid */}
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
                                <span className="text-[10px] font-mono text-stone-300 block mb-2 italic">
                                    0{index + 1}—
                                </span>

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

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <p className="text-[10px] tracking-[0.3em] uppercase text-stone-300">
                        Made with care • Trusted quality
                    </p>
                </motion.div>
            </div>
        </section>
    );
}