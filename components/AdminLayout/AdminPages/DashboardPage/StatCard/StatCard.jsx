'use client';
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color }) => (
    <motion.div
        whileHover={{ y: -3 }}
        className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-all"
    >
        <div className="flex justify-between items-start mb-2 sm:mb-4">
            <div
                className={`p-2 sm:p-3 rounded-lg sm:rounded-2xl text-white ${color} bg-opacity-10 text-sm sm:text-lg`}
            >
                {icon}
            </div>
        </div>

        <div>
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
                {title}
            </p>
            <h3 className="text-lg sm:text-2xl font-semibold text-slate-900">
                {value}
            </h3>
        </div>
    </motion.div>
);

export default StatCard