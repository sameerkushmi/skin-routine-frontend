"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiInstagram } from "react-icons/fi";
import Link from "next/link";

const ContactCTA = () => {
    return (
        <section className="relative py-14 sm:py-16 md:py-24 bg-white overflow-hidden">

            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-50/40 via-transparent to-transparent -z-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Label */}
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] text-rose-400 uppercase mb-4 block">
                        Your Transformation
                    </span>

                    {/* Heading */}
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-stone-900 mb-4 md:mb-6 tracking-tight">
                        Elevate your <span className="italic font-serif">daily ritual.</span>
                    </h2>

                    {/* Text */}
                    <p className="text-sm sm:text-base md:text-lg text-stone-500 font-light mb-8 md:mb-12 max-w-md md:max-w-2xl mx-auto leading-relaxed">
                        Discover curated skincare or connect with our specialists.
                    </p>
                </motion.div>

                {/* CTA */}
                <div className="flex flex-col items-center gap-6 md:gap-10">

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
                        <Link
                            href="/shop"
                            className="group inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-4 bg-stone-900 text-white rounded-full transition-all duration-300 hover:gap-3"
                        >
                            <span className="uppercase text-[11px] md:text-xs font-bold tracking-widest">
                                Shop Collections
                            </span>
                            <FiArrowUpRight className="opacity-70 group-hover:opacity-100 transition-all" />
                        </Link>
                    </div>

                    {/* Instagram */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            href={process.env.NEXT_PUBLIC_INSTAGRAM}
                            target="_blank"
                            className="flex items-center gap-2 text-stone-400 hover:text-rose-400 transition-colors duration-300"
                        >
                            <FiInstagram className="text-base md:text-lg" />
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] md:tracking-[0.2em] font-medium border-b border-stone-200 pb-1">
                                Join our community
                            </span>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ContactCTA;