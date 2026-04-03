import Link from "next/link";
import { PiFacebookLogoThin, PiInstagramLogoThin, PiPinterestLogoThin, PiTiktokLogoThin } from "react-icons/pi";

export default function SiteMapPage() {
    const categories = [
        {
            label: "Shop",
            links: [
                { title: "Home", href: "/" },
                { title: "Shop", href: "/shop" },
            ],
        },
        {
            label: "Content",
            links: [
                { title: "Blogs", href: "/blogs" },
            ],
        },
        {
            label: "Company",
            links: [
                { title: "About Us", href: "/about" },
                { title: "Contact", href: "/contact" },
                { title: "FAQ", href: "/faq" },
            ],
        },
        {
            label: "Legal",
            links: [
                { title: "Privacy Policy", href: "/privacy-policy" },
                { title: "Terms & Conditions", href: "/terms" },
                { title: "Shipping & Returns", href: "/shipping-returns" },
                { title: "Sitemap", href: "/sitemap" },
            ],
        },
    ];

    return (
        <main className="bg-[#FAF9F6] min-h-screen font-sans text-stone-800">
            {/* Decorative Top Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-stone-200 via-rose-100 to-stone-200" />

            <section className="max-w-6xl mx-auto px-6 py-20">
                {/* Header Section */}
                <header className="mb-20 border-b border-stone-200 pb-12">
                    <nav className="mb-8">
                        <Link
                            href="/"
                            className="text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-rose-500 transition-colors"
                        >
                            &larr; Return to Store
                        </Link>
                    </nav>
                    <h1 className="text-5xl md:text-6xl font-serif italic text-stone-900 mb-6">
                        Site Index
                    </h1>
                    <p className="text-stone-500 max-w-lg leading-relaxed">
                        A comprehensive directory of our digital atelier. Navigate through our
                        collections, member services, and legal protocols with ease.
                    </p>
                </header>

                {/* Directory Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {categories.map((category) => (
                        <div key={category.label} className="flex flex-col">
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold mb-8 pb-2 border-b border-stone-100">
                                {category.label}
                            </h2>
                            <ul className="space-y-4">
                                {category.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-all duration-300"
                                        >
                                            {/* Subtle hover indicator */}
                                            <span className="h-px w-0 bg-rose-300 group-hover:w-3 transition-all duration-300" />
                                            <span className="text-sm font-light tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                                                {link.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Brand Footer Sign-off */}
                <footer className="mt-32 pt-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] uppercase tracking-widest text-stone-400">
                        © 2026 SkinRoutine — All Rights Reserved
                    </div>
                    {/* Social Icons - Clean & Minimal */}
                    <div className="flex gap-6 mt-8">
                        {[
                            { icon: <PiFacebookLogoThin size={24} />, href: process.env.NEXT_PUBLIC_FACEBOOK },
                            { icon: <PiInstagramLogoThin size={24} />, href: process.env.NEXT_PUBLIC_INSTAGRAM },
                            { icon: <PiTiktokLogoThin size={24} />, href: process.env.NEXT_PUBLIC_TIKTOK },
                            { icon: <PiPinterestLogoThin size={24} />, href: process.env.NEXT_PUBLIC_PINTEREST },
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
                </footer>
            </section>
        </main>
    );
}