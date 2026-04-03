"use client";

import { motion } from "framer-motion";

const ContactHero = () => {
    return (
        <section className="relative overflow-hidden bg-[#FCFBFA] py-12 sm:py-16 md:py-20">

            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-[60%] md:w-[40%] h-full bg-pink-50/40 blur-[80px] md:blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">

                {/* LEFT */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="lg:col-span-7 space-y-6 md:space-y-10"
                >
                    <div className="space-y-3">
                        <span className="text-[9px] md:text-[10px] tracking-[0.35em] md:tracking-[0.5em] uppercase font-bold text-stone-400 block">
                            The Concierge
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 leading-tight md:leading-[1.1] tracking-tight">
                            Personalized care <br />
                            <span className="italic font-light text-pink-300">
                                for your skin's story.
                            </span>
                        </h1>
                    </div>

                    <div className="flex gap-4 md:gap-8">
                        {/* Line */}
                        <div className="w-px h-16 md:h-24 bg-stone-200 mt-1 md:mt-2" />

                        <p className="text-sm sm:text-base md:text-lg text-stone-500 font-light leading-relaxed max-w-xs sm:max-w-sm">
                            Our specialists provide tailored consultations, product guidance, and skincare rituals.
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.03 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="lg:col-span-5 relative"
                >
                    {/* Frame */}
                    <div className="absolute -inset-2 md:-inset-4 border border-stone-100 rounded-sm -z-10" />

                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 shadow-xl md:shadow-2xl md:shadow-stone-200/50">
                        <motion.img
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.5 }}
                            src="/images/contactpage/home-hero/hero.jpeg"
                            alt="Luxury skincare consultation"
                            className="w-full h-full object-cover"
                        />

                        {/* Grain */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                    </div>

                    {/* Tag */}
                    <div className="absolute bottom-3 left-2 md:bottom-6 md:-left-6 bg-white px-3 py-2 md:px-5 md:py-3 shadow-lg md:shadow-xl">
                        <p className="text-[8px] md:text-[9px] tracking-[0.25em] md:tracking-[0.3em] uppercase font-bold text-stone-900">
                            Est. 2018
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactHero;