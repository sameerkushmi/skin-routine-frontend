"use client";

import { motion } from "framer-motion";

export default function MissionVision() {
    const values = [
        { title: "Cruelty Free", icon: "◈" },
        { title: "Natural Ingredients", icon: "🌿" },
        { title: "Eco Friendly", icon: "♺" },
        { title: "Premium Quality", icon: "✧" },
        { title: "Honest Brand", icon: "◎" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.21, 0.45, 0.32, 0.9],
            },
        },
    };

    return (
        <section className="py-10 bg-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    {/* Left Side */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="lg:col-span-5"
                    >
                        <motion.span
                            variants={itemVariants}
                            className="text-xs tracking-[0.4em] uppercase text-stone-400 block mb-6"
                        >
                            Our Mission
                        </motion.span>

                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-serif text-stone-900 mb-8 leading-tight"
                        >
                            Natural Beauty <br />
                            <span className="font-sans font-light text-stone-400">
                                with Modern Care
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-stone-500 text-lg font-light leading-relaxed mb-8"
                        >
                            Our mission is to create skincare products that are safe,
                            effective, and made with natural ingredients. We believe
                            everyone deserves healthy and glowing skin.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="h-[1px] w-24 bg-stone-200"
                        />
                    </motion.div>

                    {/* Right Side */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Vision Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="sm:col-span-2 p-10 bg-stone-50 border border-stone-100 rounded-2xl"
                            >
                                <h3 className="text-xs tracking-widest uppercase text-stone-400 mb-4 font-semibold">
                                    Our Vision
                                </h3>

                                <p className="text-xl md:text-2xl font-light text-stone-800 leading-snug">
                                    To become a trusted skincare brand known for quality,
                                    honesty, and real results.
                                </p>
                            </motion.div>

                            {/* Value Cards */}
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        y: -5,
                                        backgroundColor: "#fdfdfd",
                                    }}
                                    className="p-8 border border-stone-100 rounded-2xl flex flex-col justify-between group transition-colors"
                                >
                                    <span className="text-2xl mb-6 block grayscale group-hover:grayscale-0 transition-all">
                                        {value.icon}
                                    </span>

                                    <h4 className="text-sm tracking-widest uppercase font-medium text-stone-700">
                                        {value.title}
                                    </h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}