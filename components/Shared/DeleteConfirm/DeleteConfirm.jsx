"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function DeleteConfirm({ isOpen, onClose, onConfirm, loading, title = "Are you sure?" }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-2xl p-6 w-80 max-w-full shadow-xl"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-slate-100 transition"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading && (
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                )}
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}