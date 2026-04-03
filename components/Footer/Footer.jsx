"use client";

import Link from "next/link";
import { PiInstagramLogoThin, PiFacebookLogoThin, PiPinterestLogoThin, PiTiktokLogoThin } from "react-icons/pi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#FFF8F9] border-t border-rose-50 text-stone-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

                {/* Main Content Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-16">

                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="text-2xl sm:text-3xl font-serif italic tracking-tight text-stone-800">
                            Skin<span className="font-sans not-italic font-light text-pink-400">Routine</span>
                        </Link>
                        <p className="mt-4 sm:mt-6 text-stone-500 font-light leading-relaxed text-sm sm:text-base max-w-sm">
                            Redefining the standards of beauty through conscious curation
                            and organic rituals. Empowering your radiance, every single day.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-8">
                            {[
                                { icon: <PiFacebookLogoThin size={20} />, href: process.env.NEXT_PUBLIC_FACEBOOK },
                                { icon: <PiInstagramLogoThin size={20} />, href: process.env.NEXT_PUBLIC_INSTAGRAM },
                                { icon: <PiTiktokLogoThin size={20} />, href: process.env.NEXT_PUBLIC_TIKTOK },
                                { icon: <PiPinterestLogoThin size={20} />, href: process.env.NEXT_PUBLIC_PINTEREST },
                            ].map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    className="text-stone-400 hover:text-pink-400 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {[
                        {
                            title: "Collection", links: [
                                { href: "/shop?category=cleanser", label: "Cleansers" },
                                { href: "/shop?category=cream", label: "Creams" },
                                { href: "/shop?category=moisturizer", label: "Moisturizers" },
                                { href: "/shop?category=sunscreen", label: "Sunscreens" },
                            ]
                        },
                        {
                            title: "Quick Links", links: [
                                { href: "/", label: "Home" },
                                { href: "/shop", label: "All Products" },
                                { href: "/about", label: "About Us" },
                                { href: "/blogs", label: "Blogs" },
                            ]
                        },
                        {
                            title: "Support", links: [
                                { href: "/shipping-returns", label: "Shipping & Returns" },
                                { href: "/faq", label: "FAQs" },
                                { href: "/privacy-policy", label: "Privacy Policy" },
                                { href: "/contact", label: "Contact Us" },
                            ]
                        },
                    ].map((col, idx) => (
                        <div key={idx}>
                            <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-6 sm:mb-8">
                                {col.title}
                            </h4>
                            <ul className="space-y-3 sm:space-y-4 font-light text-sm">
                                {col.links.map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="hover:text-pink-400 transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 sm:mt-16 pt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest">
                    <p>© {currentYear} SkinRoutine. All rights reserved.</p>
                    <div className="flex gap-6 sm:gap-8">
                        <Link href="/terms" className="hover:text-stone-800 transition-colors">Terms</Link>
                        <Link href="/sitemap" className="hover:text-stone-800 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}