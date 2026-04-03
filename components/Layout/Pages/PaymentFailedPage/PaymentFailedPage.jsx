"use client";

import { motion } from "framer-motion";
import { FiX, FiRefreshCcw, FiArrowLeft, FiHelpCircle } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentFailedPage() {
    const router = useRouter();

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-6 relative overflow-hidden">
            {/* Soft Ambient Background Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-slate-100/60 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 sm:p-12 text-center relative z-10"
            >
                {/* Minimalist Error Icon */}
                <motion.div
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-rose-200/30 blur-2xl rounded-full" />
                        <div className="relative bg-white shadow-sm border border-rose-100 p-5 rounded-3xl">
                            <FiX className="text-rose-400 text-3xl stroke-[1.5]" />
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-3 mb-10">
                    <h1 className="text-3xl font-serif text-slate-900 tracking-tight">
                        Payment <span className="italic text-rose-400/80">Unsuccessful</span>
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed font-light px-4">
                        We were unable to process your transaction at this moment.
                        Your selection remains reserved in your cart.
                    </p>
                </div>

                {/* Primary Actions */}
                <div className="space-y-4">
                    <Link
                        href="/account/carts"
                        className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-slate-50 transition-all duration-300"
                    >
                        <FiArrowLeft className="text-sm" />
                        Return to Cart
                    </Link>
                </div>

                {/* Secondary Navigation */}
                <div className="mt-8 flex justify-center gap-6">
                    <Link
                        href="/account/orders"
                        className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors border-b border-transparent hover:border-slate-900"
                    >
                        Order History
                    </Link>
                </div>

                {/* Support Footer */}
                <div className="mt-12 pt-8 border-t border-slate-100/60">
                    <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
                        <FiHelpCircle size={14} />
                        <span className="text-[10px] uppercase tracking-widest font-medium">Concierge Support</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light italic">
                        If the issue persists, try an alternative method like
                        <span className="text-slate-600 font-medium not-italic px-1">eSewa</span> or
                        <span className="text-slate-600 font-medium not-italic px-1">Bank Transfer</span>.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}