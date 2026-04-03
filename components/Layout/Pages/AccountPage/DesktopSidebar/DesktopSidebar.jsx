"use client";

import { useMyContext } from "@/components/utils/Context/Context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Added for active states
import { HiOutlineMenuAlt2 } from "react-icons/hi"; // More elegant icons
import { RiLogoutCircleLine } from "react-icons/ri";

const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 88 },
};

const transition = { type: "spring", stiffness: 200, damping: 25 };

export default function DesktopSidebar({
    desktopCollapsed,
    setDesktopCollapsed,
    menuItems,
}) {
    const { logout } = useMyContext();
    const pathname = usePathname();

    return (
        <motion.aside
            initial={false}
            animate={desktopCollapsed ? "collapsed" : "expanded"}
            variants={sidebarVariants}
            transition={transition}
            className="hidden md:flex flex-col bg-white border-r border-stone-100 h-screen sticky top-0 left-0 z-50"
        >
            {/* Logo Section */}
            <div className="h-24 flex items-center px-6 relative">
                <AnimatePresence mode="wait">
                    {!desktopCollapsed ? (
                        <motion.div
                            key="logo-full"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2"
                        >
                            <Link href="/" className="text-2xl font-serif tracking-tight text-stone-800">
                                Skin<span className="text-pink-400 font-sans italic font-light">R.</span>
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="logo-short"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mx-auto text-xl font-serif text-pink-400"
                        >
                            S.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Collapse Toggle - Floating Style */}
            <button
                onClick={() => setDesktopCollapsed(!desktopCollapsed)}
                className="absolute -right-3 top-10 w-6 h-6 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-pink-500 hover:border-pink-200 shadow-sm transition-all z-50"
            >
                <motion.div animate={{ rotate: desktopCollapsed ? 180 : 0 }}>
                    <HiOutlineMenuAlt2 size={12} />
                </motion.div>
            </button>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.label} href={item.href} className="relative block group">
                            <motion.div
                                className={`flex items-center h-12 rounded-xl transition-all duration-300 ${isActive
                                        ? "bg-stone-900 text-white shadow-lg shadow-stone-200"
                                        : "text-stone-500 hover:bg-stone-50"
                                    } ${desktopCollapsed ? "justify-center" : "px-4 gap-4"}`}
                            >
                                <span className={`text-xl ${isActive ? "text-pink-300" : "group-hover:text-stone-900"}`}>
                                    {item.icon}
                                </span>

                                {!desktopCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-sm font-medium tracking-wide whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}

                                {/* Active Indicator Dot */}
                                {isActive && desktopCollapsed && (
                                    <motion.div
                                        layoutId="activeDot"
                                        className="absolute -right-1 w-1.5 h-1.5 bg-pink-400 rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Section / Logout */}
            <div className="p-4 mt-auto border-t border-stone-50">
                <button
                    onClick={logout}
                    className={`flex items-center h-12 rounded-xl w-full transition-all group
                        ${desktopCollapsed ? "justify-center" : "px-4 gap-4"}
                        text-stone-400 hover:text-red-500 hover:bg-red-50`}
                >
                    <RiLogoutCircleLine size={22} className="group-hover:rotate-12 transition-transform" />
                    {!desktopCollapsed && (
                        <span className="text-sm font-medium uppercase tracking-widest text-[10px]">
                            Sign Out
                        </span>
                    )}
                </button>
            </div>
        </motion.aside>
    );
}