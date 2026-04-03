"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiLock, FiArrowRight } from "react-icons/fi";

export default function NotLoggedIn() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
            {/* Background Decorative Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-100/40 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-slate-200/50 blur-[100px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-lg px-6"
            >
                <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[3rem] p-10 md:p-16 text-center">

                    {/* Minimalist Header Icon */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
                    >
                        <FiLock className="text-white" size={24} />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 leading-tight">
                        A Private Space
                    </h2>

                    <p className="text-slate-500 text-base font-light leading-relaxed mb-10">
                        To access your curated dashboard, saved rituals, and exclusive orders, please step into your account.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="/login"
                            className="group relative flex items-center justify-center gap-3 bg-pink-500 hover:bg-slate-900 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-500 shadow-lg shadow-pink-500/20"
                        >
                            <span className="text-xs uppercase tracking-[0.2em]">Sign In</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="pt-8 mt-4 border-t border-slate-100 flex flex-col gap-2">
                            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                                New to the Journal?
                            </p>
                            <Link
                                href="/register"
                                className="text-sm font-serif italic text-slate-900 hover:text-pink-500 transition-colors"
                            >
                                Create An Account &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Return Home Link */}
                <div className="mt-8 text-center">
                    <Link href="/" className="text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors font-bold">
                        Back to Homepage
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}