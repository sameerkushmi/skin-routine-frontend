"use client";

import {  FiArrowRight, FiCheck, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PaymentSuccessPage() {

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-6 relative overflow-hidden">
            {/* Soft Ambient Backgrounds */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/40 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-50/30 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white border border-stone-100 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] p-10 sm:p-14 text-center"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center"
                    >
                        {/* Animated Checkmark Icon */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 12 }}
                            className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner"
                        >
                            <FiCheck size={36} strokeWidth={1.5} />
                        </motion.div>

                        <h1 className="text-3xl font-serif text-slate-900 mb-3 tracking-tight">
                            Order <span className="italic text-emerald-700/70">Confirmed</span>
                        </h1>

                        <p className="text-sm text-slate-500 font-light leading-relaxed mb-10 px-2">
                            Your payment was successful. We are now preparing your pieces for their journey to you.
                        </p>

                        <div className="w-full space-y-4">
                            <Link
                                href="/account/orders"
                                className="group w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-slate-800 transition-all duration-300"
                            >
                                Manage Orders
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/shop"
                                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-slate-50 transition-all"
                            >
                                <FiShoppingBag className="text-sm" />
                                The Collection
                            </Link>
                        </div>

                        {/* Auto-redirect progress bar */}
                        <div className="mt-12 w-full max-w-[120px] mx-auto">
                            <p className="text-[9px] uppercase tracking-widest text-slate-300 mb-2">Redirecting</p>
                            <div className="h-[1px] w-full bg-slate-100 relative overflow-hidden">
                                <motion.div
                                    initial={{ left: "-100%" }}
                                    animate={{ left: "0%" }}
                                    transition={{ duration: 6, ease: "linear" }}
                                    className="absolute inset-0 bg-slate-400"
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}