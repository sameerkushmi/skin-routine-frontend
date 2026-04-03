"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { PiEnvelopeThin, PiSparkleLight } from "react-icons/pi";
import toast from 'react-hot-toast';
import api from '../utils/Api/api';

export default function Newsletter() {

    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            await api.post('/subscribers', { email })
            toast.success("Welcome to the inner circle! 🌸")
            setEmail('')
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id='subscribe' className="relative overflow-hidden bg-[#FFF8F9] py-10 border-t border-rose-50">

            {/* Soft Ambient Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-0 right-[20%] w-96 h-96 bg-pink-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-[20%] w-96 h-96 bg-rose-100/30 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

                {/* Visual Accent */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="flex justify-center mb-8"
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-rose-50">
                        <PiSparkleLight className="text-pink-300 text-3xl animate-pulse" />
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif text-stone-800 leading-tight"
                >
                    Join the <span className="italic font-light text-pink-300">Inner Circle</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mt-6 text-stone-500 font-light max-w-lg mx-auto leading-relaxed"
                >
                    Subscribe to receive curated beauty rituals, exclusive collection previews,
                    and early access to our seasonal launches.
                </motion.p>

                {/* Sophisticated Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-12 flex flex-col sm:flex-row gap-0 items-center justify-center max-w-lg mx-auto group"
                >
                    <div className="relative w-full">
                        <PiEnvelopeThin className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 text-xl" />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Your email address"
                            className="w-full pl-14 pr-6 py-5 rounded-l-full sm:rounded-r-none rounded-r-full outline-none bg-white border border-stone-100 focus:border-pink-200 text-stone-800 placeholder-stone-300 transition-all duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 lg:mt-0 sm:w-auto bg-stone-900 text-white px-10 py-5 rounded-r-full sm:rounded-l-none rounded-l-full font-medium tracking-widest uppercase text-[10px] hover:bg-stone-800 transition-all duration-500 shadow-xl shadow-stone-200 active:scale-95 whitespace-nowrap"
                    >
                        {
                            isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.2s]"></span>
                                    <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.4s]"></span>
                                    <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.6s]"></span>
                                </span>
                            ) : "Join Now"
                        }

                    </button>
                </motion.form>

                {/* Privacy Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium"
                >
                    Privacy is luxury. No spam, just beauty.
                </motion.p>
            </div>
        </section>
    );
}