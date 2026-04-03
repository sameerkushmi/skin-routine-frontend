import { motion } from "framer-motion"

const Loader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                    borderRadius: ["50%", "40%", "50%"]
                }}
                transition={{
                    rotate: { repeat: Infinity, duration: 1, ease: "linear" },
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                className="h-12 w-12 border-4 border-t-[#9A0044] border-r-[#9A0044]/30 border-b-[#9A0044]/10 border-l-[#9A0044]/30 rounded-full"
            />
        </div>
    )
}

export default Loader