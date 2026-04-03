"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaSignOutAlt, FaInstagram, FaTwitter, FaBars } from "react-icons/fa";
import { FiX, FiArrowRight } from "react-icons/fi";
import { useMyContext } from "@/components/utils/Context/Context";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const MobileDrawer = ({ open, setOpen, menuItems }) => {
    const { logout } = useMyContext();

    return (
        <>
            {/* Mobile Header */}
            <nav className="sticky top-0 z-50 md:hidden px-4 py-3">
                {/* Glassmorphism Container */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-stone-100 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]" />

                <div className="relative flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link
                        href="/"
                        className="group flex flex-col items-start"
                    >
                        <span className="text-xl font-serif italic tracking-tighter text-slate-900 leading-none">
                            Skin<span className="font-sans not-italic font-light text-rose-500">Routine</span>
                        </span>
                        <span className="text-[7px] uppercase font-bold tracking-[0.4em] text-stone-400 mt-0.5 group-hover:text-rose-400 transition-colors">
                            Aesthetic Lab
                        </span>
                    </Link>

                    {/* Action Icons */}
                    <div>
                        {/* Minimalist Menu Toggle */}
                        <button
                            onClick={() => setOpen(true)}
                            className="p-2 bg-slate-900 text-white rounded-full active:scale-90 transition-all shadow-lg shadow-slate-200"
                        >
                            <HiOutlineMenuAlt3 size={18} />
                        </button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {open && (
                    <>
                        {/* HIGH-END OVERLAY */}
                        <motion.div
                            className="fixed inset-0 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* PREMIUM DRAWER */}
                        <motion.aside
                            className="fixed inset-0 right-0 left-0 sm:left-auto sm:w-[400px] bg-white z-[70] shadow-2xl overflow-hidden flex flex-col md:hidden"
                            initial={{ x: "110%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "110%", opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 180,
                            }}
                        >
                            {/* DECORATIVE TOP BAR */}
                            <div className="h-1.5 w-12 bg-stone-200 rounded-full mx-auto" />

                            {/* HEADER */}
                            <div className="px-8 pt-6 pb-8 flex justify-between items-center border-b border-stone-50">
                                <div className="space-y-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Account</span>
                                    <h2 className="text-2xl font-serif italic text-slate-900">Your Sanctuary</h2>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-3 bg-stone-50 rounded-full text-slate-900 hover:rotate-90 transition-transform duration-300"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            {/* MENU ITEMS */}
                            <motion.nav
                                initial="hidden"
                                animate="visible"
                                className="flex-1 px-8 space-y-8 overflow-y-auto"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1 } }
                                }}
                            >
                                {menuItems.map((item) => (
                                    <motion.div
                                        key={item.label}
                                        variants={{
                                            hidden: { opacity: 0, x: 20 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="group flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-5">
                                                <span className="p-3 bg-stone-50 rounded-2xl text-slate-600 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                                                    {item.icon}
                                                </span>
                                                <span className="text-xl font-light text-slate-800 tracking-tight group-hover:translate-x-1 transition-transform">
                                                    {item.label}
                                                </span>
                                            </div>
                                            <FiArrowRight className="opacity-0 group-hover:opacity-100 text-rose-600 transition-all -translate-x-4 group-hover:translate-x-0" />
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.button
                                    variants={{
                                        hidden: { opacity: 0, x: 20 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="w-full flex items-center gap-5 p-1 group"
                                    onClick={logout}
                                >
                                    <span className="p-3 bg-rose-50 rounded-2xl text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                                        <FaSignOutAlt />
                                    </span>
                                    <span className="text-xl font-light text-rose-600">Log Out</span>
                                </motion.button>
                            </motion.nav>

                            {/* DRAWER FOOTER */}
                            <div className="p-8 bg-stone-50/50 border-t border-stone-100 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <FaInstagram className="text-stone-400 hover:text-slate-900 cursor-pointer transition-colors" />
                                    <FaTwitter className="text-stone-400 hover:text-slate-900 cursor-pointer transition-colors" />
                                </div>
                                <Link href={`/contact`}>

                                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                        Help & Support
                                    </span>
                                </Link>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileDrawer;