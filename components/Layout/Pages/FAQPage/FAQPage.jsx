"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        category: "Orders",
        question: "How do I place an order?",
        answer: "You can curate your selection through our digital atelier. Simply add your desired formulations to your bag and proceed through our secure, encrypted checkout.",
    },
    {
        category: "Logistics",
        question: "What is the return policy?",
        answer: "We accept returns within 14 days of delivery for unused products in their original, sealed packaging. Due to the artisanal nature of our products, we cannot accept returns on opened items.",
    },
    {
        category: "Delivery",
        question: "How can I track my order?",
        answer: "Once your collection is dispatched, a concierge email will be sent containing your unique tracking credentials to follow the journey to your door.",
    },
    {
        category: "Shipping",
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to select global destinations. Shipping fees and transit times are calculated at checkout based on your specific region.",
    },
    {
        category: "Changes",
        question: "Can I cancel or change my order?",
        answer: "Modifications can be made within a 2-hour window of placement. Beyond this time, our fulfillment team has likely already begun preparing your bespoke package.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <main className="bg-[#FAF9F6] min-h-screen font-sans text-stone-800">
            {/* Decorative Top Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-stone-200 via-rose-100 to-stone-200" />

            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Side: Editorial Header */}
                    <div className="lg:col-span-4 lg:sticky lg:top-12 h-fit">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-rose-400 font-bold mb-4 block">
                            Concierge
                        </span>
                        <h1 className="text-5xl font-serif italic text-stone-900 mb-6 leading-tight">
                            Common <br /> Inquiries
                        </h1>
                        <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-xs">
                            Everything you need to know about the SkinRoutine experience,
                            from formulation to your front door.
                        </p>

                        <div className="p-6 border border-stone-200 bg-white/50 rounded-sm">
                            <h3 className="text-xs uppercase tracking-widest font-semibold mb-2">Still have questions?</h3>
                            <p className="text-xs text-stone-500 mb-4">Our beauty concierge is available 24/7.</p>
                            <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="text-xs uppercase tracking-widest text-rose-500 hover:text-rose-600 font-bold transition-colors">
                                Email Support &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Minimalist Accordion */}
                    <div className="lg:col-span-8 border-t border-stone-200">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-stone-200">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full py-8 flex items-start justify-between text-left group"
                                >
                                    <div className="flex gap-8 items-start">
                                        <span className="text-[10px] font-medium text-stone-300 mt-2 tracking-tighter">
                                            0{index + 1}
                                        </span>
                                        <div>
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-rose-400 block mb-1">
                                                {faq.category}
                                            </span>
                                            <h2 className={`text-xl transition-all duration-300 ${openIndex === index ? 'text-stone-900 font-medium' : 'text-stone-600 group-hover:text-stone-900'}`}>
                                                {faq.question}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Minimalist Plus/Minus Icon */}
                                    <div className="relative flex items-center justify-center w-6 h-6 mt-1">
                                        <div className="absolute w-4 h-[1px] bg-stone-400" />
                                        <motion.div
                                            animate={{ rotate: openIndex === index ? 0 : 90 }}
                                            className="absolute w-4 h-[1px] bg-stone-400"
                                        />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-10 pl-16 pr-12 text-stone-500 leading-relaxed max-w-2xl text-base">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}