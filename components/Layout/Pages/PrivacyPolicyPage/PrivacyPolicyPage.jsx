import Link from "next/link";

export default function PrivacyPolicyPage() {
    const lastUpdated = "February 2026"; // Or use your dynamic date logic

    return (
        <main className="bg-[#FAF9F6] min-h-screen font-sans text-stone-800">
            {/* Decorative Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-stone-200 via-rose-100 to-stone-200" />

            <section className="max-w-4xl mx-auto px-6 py-20">
                {/* Header Area */}
                <header className="mb-20 border-b border-stone-200 pb-12">
                    <nav className="mb-8">
                        <Link
                            href="/"
                            className="text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-rose-500 transition-colors"
                        >
                            &larr; Return Home
                        </Link>
                    </nav>

                    <h1 className="text-5xl md:text-6xl font-serif italic text-stone-900 mb-8">
                        Privacy Policy
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-stone-500">
                        <span className="px-3 py-1 border border-stone-200 rounded-full uppercase text-[10px] tracking-widest">
                            Data Protection
                        </span>
                        <span className="h-px w-12 bg-stone-300 hidden sm:block"></span>
                        <p>Your trust is our most valued asset. Last updated: {lastUpdated}</p>
                    </div>
                </header>

                {/* Introduction */}
                <div className="max-w-2xl mb-24">
                    <p className="text-xl text-stone-600 leading-relaxed font-light">
                        At <span className="text-stone-900 font-medium">SkinRoutine</span>,
                        transparency is at the core of our philosophy. This policy outlines
                        how we curate and safeguard your personal data with the same care
                        we apply to our skincare formulations.
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="space-y-24">

                    {/* Section 01 */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <aside>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">01. Collection</span>
                            <h2 className="text-lg font-medium text-stone-900 mt-2">Information We Acquire</h2>
                        </aside>
                        <div className="md:col-span-2">
                            <p className="text-stone-600 leading-relaxed mb-6">
                                To provide a bespoke experience, we collect specific identifiers during your journey with us:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Identity Details (Name, Email, Phone)",
                                    "Logistics (Billing and Shipping coordinates)",
                                    "Account Credentials for our Digital Atelier",
                                    "Browsing preferences and cookie-based insights"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-stone-600">
                                        <span className="mt-2.5 h-1 w-1 rounded-full bg-rose-300 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Section 02 */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <aside>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">02. Application</span>
                            <h2 className="text-lg font-medium text-stone-900 mt-2">Usage of Data</h2>
                        </aside>
                        <div className="md:col-span-2">
                            <p className="text-stone-600 leading-relaxed mb-6">
                                Your data is utilized strictly to refine our service and deliver excellence:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-4 rounded-sm border border-stone-200 bg-white/50">
                                    <h4 className="text-xs uppercase tracking-wider font-semibold mb-2">Fulfillment</h4>
                                    <p className="text-sm text-stone-500">Processing orders and securing seamless delivery.</p>
                                </div>
                                <div className="p-4 rounded-sm border border-stone-200 bg-white/50">
                                    <h4 className="text-xs uppercase tracking-wider font-semibold mb-2">Curation</h4>
                                    <p className="text-sm text-stone-500">Tailoring product recommendations to your skin profile.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 03 */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
                        <aside>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">03. Safeguarding</span>
                            <h2 className="text-lg font-medium text-stone-900 mt-2">Security Measures</h2>
                        </aside>
                        <div className="md:col-span-2">
                            <p className="text-stone-600 leading-relaxed">
                                We employ high-tier encryption and secure socket layer (SSL) technology
                                to ensure your personal data is shielded. While no digital vault is
                                impenetrable, we maintain the highest industry standards to mitigate risks.
                            </p>
                        </div>
                    </section>

                    {/* Section 04 */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
                        <aside>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">04. Agency</span>
                            <h2 className="text-lg font-medium text-stone-900 mt-2">Your Rights</h2>
                        </aside>
                        <div className="md:col-span-2">
                            <p className="text-stone-600 leading-relaxed mb-6">
                                You retain full sovereignty over your information. At any moment, you may:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["Request Access", "Amend Details", "Invoke Erasure", "Opt-out of Marketing"].map((tag) => (
                                    <span key={tag} className="text-[11px] px-4 py-2 bg-stone-100 text-stone-600 uppercase tracking-tighter">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contact / Footer CTA */}
                    <footer className="mt-32 p-12 bg-stone-900 text-white rounded-sm text-center relative overflow-hidden">
                        {/* Subtle Background Pattern or Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] -mr-32 -mt-32" />

                        <h3 className="text-2xl font-serif italic mb-4 relative z-10">Dedicated to your peace of mind.</h3>
                        <p className="text-stone-400 text-sm mb-8 max-w-md mx-auto relative z-10">
                            Should you require further clarification regarding our data protocols,
                            our privacy concierge is at your disposal.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block border border-rose-200 text-rose-100 px-10 py-4 text-xs uppercase tracking-[0.2em] hover:bg-rose-200 hover:text-stone-900 transition-all relative z-10"
                        >
                            Contact Privacy Concierge
                        </Link>
                    </footer>
                </div>
            </section>
        </main>
    );
}