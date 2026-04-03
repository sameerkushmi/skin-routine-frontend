"use client";

import { motion, AnimatePresence } from "framer-motion";
import { VscClose } from "react-icons/vsc";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";

const MobileMenu = ({ menuOpen, navItems, closeMenu }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const listVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.5 },
        }),
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

    return (
        <AnimatePresence>
            {menuOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed h-[100dvh] overflow-y-scroll inset-0 bg-white z-50 flex flex-col lg:hidden"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-8 border-b">
                        <span className="font-serif italic text-xl">Menu</span>
                        <button onClick={closeMenu}>
                            <VscClose size={32} />
                        </button>
                    </div>

                    {/* Menu */}
                    <ul className="flex-1 px-8 pt-10 space-y-8 overflow-y-auto">
                        {navItems.map((item, idx) => {
                            const hasSubmenu = item.submenu?.length;

                            return (
                                <motion.li
                                    key={idx}
                                    custom={idx}
                                    initial="hidden"
                                    animate="visible"
                                    variants={listVariants}
                                >
                                    {/* Main Item */}
                                    <div
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={() =>
                                            hasSubmenu
                                                ? setOpenIndex(openIndex === idx ? null : idx)
                                                : closeMenu()
                                        }
                                    >
                                        {hasSubmenu ? (
                                            <span className="text-4xl font-light text-stone-800">
                                                {item.name}
                                            </span>
                                        ) : (
                                            <Link
                                                href={item.path}
                                                onClick={closeMenu}
                                                className="text-4xl font-light text-stone-800"
                                            >
                                                {item.name}
                                            </Link>
                                        )}

                                        {hasSubmenu && (
                                            <FiChevronDown
                                                className={`transition-transform ${openIndex === idx ? "rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </div>

                                    {/* Submenu */}
                                    <AnimatePresence>
                                        {hasSubmenu && openIndex === idx && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-4 ml-4 space-y-4 overflow-hidden"
                                            >
                                                {item.submenu.map((sub, subIdx) => (
                                                    <li key={subIdx}>
                                                        <Link
                                                            href={sub.path}
                                                            onClick={closeMenu}
                                                            className="text-lg text-stone-600 hover:text-pink-400 transition-colors"
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            );
                        })}
                    </ul>

                    {/* Footer */}
                    <div className="p-8 bg-stone-50">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">
                            Follow our journey
                        </p>
                        <div className="flex gap-6 text-sm text-stone-600">
                            <Link target="_blank" href={process.env.NEXT_PUBLIC_FACEBOOK}>Facebook</Link>
                            <Link target="_blank" href={process.env.NEXT_PUBLIC_INSTAGRAM}>Instagram</Link>
                            <Link target="_blank" href={process.env.NEXT_PUBLIC_TIKTOK}>TikTok</Link>
                            <Link target="_blank" href={process.env.NEXT_PUBLIC_PINTEREST}>Pinterest</Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
