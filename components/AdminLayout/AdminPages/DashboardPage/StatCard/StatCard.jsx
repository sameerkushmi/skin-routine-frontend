'use client';
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color }) => (
    <motion.div
        whileHover={{ y: -4 }}
        className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-all group"
    >
        <div className="flex justify-between items-start mb-4">
            <div
                className={`p-3 rounded-xl sm:rounded-2xl text-white ${color} bg-opacity-10 text-lg sm:text-xl`}
            >
                {icon}
            </div>
        </div>

        <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
                {title}
            </p>
            <h3 className="text-xl sm:text-2xl font-serif text-slate-900">{value}</h3>
        </div>
    </motion.div>
);

export default StatCard