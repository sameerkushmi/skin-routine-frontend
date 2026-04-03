"use client";

import { useState } from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from "react-icons/fa";
import { FiLink, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialShare({ url, title }) {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: <FaFacebookF size={14} />,
        },
        {
            name: "Twitter",
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            icon: <FaTwitter size={14} />,
        },
        {
            name: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            icon: <FaLinkedinIn size={14} />,
        },
        {
            name: "Pinterest",
            href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
            icon: <FaPinterestP size={14} />,
        },
    ];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 mt-16 pb-10 border-b border-slate-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

                {/* Section Title with minimalist line */}
                <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold whitespace-nowrap">
                        Spread the word
                    </span>
                    <div className="hidden sm:block h-[1px] w-12 bg-slate-100" />
                </div>

                {/* Icons Grid */}
                <div className="flex items-center gap-2">
                    {shareLinks.map((item) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full flex items-center justify-center
                                     bg-white text-slate-400 border border-slate-100
                                     hover:border-pink-200 hover:text-pink-500 hover:shadow-lg hover:shadow-pink-500/10
                                     transition-all duration-300 ease-out"
                        >
                            {item.icon}
                        </motion.a>
                    ))}

                    {/* Copy Link Button with Status Feedback */}
                    <div className="relative">
                        <motion.button
                            onClick={copyLink}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center
                                      border transition-all duration-300
                                      ${copied
                                    ? "bg-pink-500 border-pink-500 text-white"
                                    : "bg-white border-slate-100 text-slate-400 hover:border-pink-200 hover:text-pink-500"}`}
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <FiCheck size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="link"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <FiLink size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Premium Tooltip */}
                        <AnimatePresence>
                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: -45 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-md font-bold uppercase tracking-widest shadow-xl pointer-events-none"
                                >
                                    Copied!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}