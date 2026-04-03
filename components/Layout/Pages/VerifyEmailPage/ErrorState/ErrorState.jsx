import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiAlertCircle } from "react-icons/fi";

const ErrorState = () => {

    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center p-12 bg-white/40 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
        >
            {/* Soft Glow Background */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-50 blur-[60px] -z-10" />

            {/* Sophisticated Icon Design */}
            <div className="relative mb-10">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="relative z-10 w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-2xl"
                >
                    <FiAlertCircle size={40} strokeWidth={1.5} />
                </motion.div>

                {/* Animated Rings */}
                <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-red-200"
                />
            </div>

            {/* Content */}
            <div className="space-y-4 max-w-sm">
                <h2 className="text-3xl font-light tracking-tight text-slate-900 leading-tight">
                    Session <span className="font-semibold italic block">No Longer Active</span>
                </h2>

                <p className="text-slate-500 text-base leading-relaxed font-light px-4">
                    The verification link has reached its security timeout. For your protection, please initiate a new request.
                </p>
            </div>

            {/* Action Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/register")}
                className="group mt-10 relative flex items-center gap-3 bg-slate-900 text-white pl-10 pr-8 py-5 rounded-full overflow-hidden transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] active:shadow-none"
            >
                <span className="text-xs uppercase tracking-[0.25em] font-bold">
                    Request New Link
                </span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />

                {/* Subtle Shine Effect */}
                <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1 }}
                    className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[20deg]"
                />
            </motion.button>

            {/* Secondary Action */}
            <button
                onClick={() => router.push("/contact")}
                className="mt-6 text-slate-400 text-[11px] uppercase tracking-widest font-medium hover:text-slate-900 transition-colors"
            >
                Contact Concierge
            </button>
        </motion.div>
    );
};

export default ErrorState;