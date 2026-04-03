"use client";

import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";
import Link from "next/link";

const EmptyProducts = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center h-20 w-20 rounded-2xl bg-slate-100 mb-6"
            >
                <FiPackage size={32} className="text-slate-400" />
            </motion.div>

            <h3 className="text-xl font-semibold text-slate-800">
                No products found
            </h3>

            <p className="text-sm text-slate-400 mt-2 max-w-sm">
                Your catalog is empty. Start adding products to build your inventory.
            </p>

            <Link href="/admin/products/add">
                <button className="mt-6 px-6 py-3 bg-slate-900 text-white text-sm rounded-xl hover:bg-[#9A0044] transition">
                    Add First Product
                </button>
            </Link>
        </div>
    );
};

export default EmptyProducts;