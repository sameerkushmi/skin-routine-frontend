import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans text-stone-800">
            {/* Decorative Top Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-rose-200 via-pink-100 to-stone-200" />

            <div className="max-w-3xl mx-auto px-6 py-20">
                {/* Header Section */}
                <header className="mb-16 border-b border-stone-200 pb-12">
                    <nav className="mb-8">
                        <a href="/" className="text-xs uppercase tracking-widest text-stone-400 hover:text-rose-500 transition-colors">
                            &larr; Back to Shop
                        </a>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-6">
                        Terms of Service
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-stone-500">
                        <span className="uppercase tracking-tighter">Legal Documentation</span>
                        <span className="h-px w-8 bg-stone-300"></span>
                        <span>Last updated: January 2026</span>
                    </div>
                </header>

                {/* Content Body */}
                <div className="space-y-16">
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
                            01. Overview
                        </div>
                        <div className="md:col-span-3">
                            <h2 className="text-xl font-medium mb-4 text-stone-900">Introduction</h2>
                            <p className="text-stone-600 leading-relaxed">
                                Welcome to SkinRoutine. These Terms & Conditions govern your use of our digital
                                atelier and the purchase of our curated skincare collections. By accessing
                                our services, you enter into a binding agreement with us.
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
                            02. Participation
                        </div>
                        <div className="md:col-span-3">
                            <h2 className="text-xl font-medium mb-4 text-stone-900">Eligibility</h2>
                            <p className="text-stone-600 leading-relaxed">
                                Our services are intended for individuals who are at least 18 years of age.
                                By interacting with SkinRoutine, you represent and warrant that you possess
                                the legal capacity to enter into this agreement.
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
                            03. The Collection
                        </div>
                        <div className="md:col-span-3">
                            <h2 className="text-xl font-medium mb-4 text-stone-900">Products & Services</h2>
                            <p className="text-stone-600 leading-relaxed">
                                Each SkinRoutine product is subject to availability. We pride ourselves on
                                small-batch quality; therefore, we reserve the right to limit quantities
                                or discontinue formulations without prior notice to maintain our
                                standards of excellence.
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
                            04. Commitments
                        </div>
                        <div className="md:col-span-3">
                            <h2 className="text-xl font-medium mb-4 text-stone-900">Orders & Payments</h2>
                            <p className="text-stone-600 leading-relaxed">
                                Validation of an order occurs only upon successful payment authorization.
                                We utilize industry-leading encryption to ensure your financial
                                information remains as protected as your skin.
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
                            05. Ownership
                        </div>
                        <div className="md:col-span-3">
                            <h2 className="text-xl font-medium mb-4 text-stone-900">Intellectual Property</h2>
                            <p className="text-stone-600 leading-relaxed">
                                The visual identity, proprietary formulations, and editorial content
                                found herein are the exclusive property of SkinRoutine. Unauthorized
                                reproduction is strictly prohibited.
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <footer className="mt-24 pt-12 border-t border-stone-200">
                        <div className="bg-stone-100 p-8 rounded-sm text-center">
                            <h3 className="text-lg font-serif italic mb-2">Questions regarding our terms?</h3>
                            <p className="text-stone-500 text-sm mb-6">Our concierge team is available to assist you.</p>
                            <Link
                                href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                                className="inline-block bg-stone-900 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-rose-900 transition-colors"
                            >
                                Contact Concierge
                            </Link>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}