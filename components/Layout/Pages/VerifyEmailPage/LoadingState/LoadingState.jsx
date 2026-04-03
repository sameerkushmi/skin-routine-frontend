import { motion } from "framer-motion";

const LoadingState = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[300px] p-8">
            {/* Decorative Background Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-slate-100/50 to-transparent blur-3xl -z-10" />

            <div className="relative flex items-center justify-center mb-8">
                {/* Outer Pulsing Ring */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute h-24 w-24 rounded-full border border-slate-200"
                />

                {/* Modern SVG Loader */}
                <svg className="h-16 w-16" viewBox="0 0 50 50">
                    <motion.circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-slate-900"
                        initial={{ pathLength: 0, rotate: 0 }}
                        animate={{
                            pathLength: [0.2, 0.5, 0.2],
                            rotate: 360
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.8,
                            ease: "easeInOut"
                        }}
                    />
                </svg>
            </div>

            {/* Text Content with Staggered Fade */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center space-y-2"
            >
                <h2 className="text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
                    Verifying <span className="font-semibold">Your Email</span>
                </h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="flex items-center justify-center gap-2"
                >
                    <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce" />
                    <p className="text-slate-500 font-medium text-sm uppercase tracking-widest ml-2">
                        Securing Account
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoadingState;