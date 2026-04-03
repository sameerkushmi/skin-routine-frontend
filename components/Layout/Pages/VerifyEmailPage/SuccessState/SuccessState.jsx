import { useMyContext } from "@/components/utils/Context/Context";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiCheck, FiArrowRight } from "react-icons/fi";

const SuccessState = () => {

    const router = useRouter()
    const { user } = useMyContext()

    const redirectDashboard = () => {

        if (user?.role === "admin") {
            router.push("/admin/dashboard")
        } else {
            router.push("/account")
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex flex-col items-center text-center p-12 overflow-hidden"
        >
            {/* Radiant Success Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-50 blur-[80px] -z-10 rounded-full" />

            {/* Elegant Icon Reveal */}
            <div className="relative mb-12">
                {/* Expanding Ring Effect */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-emerald-200"
                />

                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                    }}
                    className="relative z-10 w-24 h-24 rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center justify-center text-emerald-600"
                >
                    <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <FiCheck size={42} strokeWidth={1.5} />
                    </motion.div>
                </motion.div>
            </div>

            {/* Text Content with Staggered Entrance */}
            <div className="space-y-4 max-w-sm">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-light tracking-tight text-slate-900"
                >
                    You're All <span className="font-semibold block italic">Set</span>
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-500 text-base leading-relaxed font-light"
                >
                    Your email has been successfully verified.
                    You’re now securely signed in and being redirected to your dashboard.
                </motion.p>
            </div>

            {/* Premium Button Action */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 w-full"
                onClick={redirectDashboard}
            >
                <button
                    className="group relative flex items-center justify-between w-full bg-slate-900 text-white px-10 py-6 rounded-full overflow-hidden transition-all hover:bg-black shadow-2xl active:scale-[0.98]"
                >
                    <span className="text-xs uppercase tracking-[0.4em] font-bold">
                        Go to Dashboard
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="h-[1px] w-8 bg-white/30 group-hover:w-12 transition-all duration-500" />
                        <FiArrowRight size={20} />
                    </div>

                    {/* Subtle Ambient Light Sweep */}
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: 2 }}
                        className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[30deg]"
                    />
                </button>
            </motion.div>
        </motion.div>
    );
};

export default SuccessState;