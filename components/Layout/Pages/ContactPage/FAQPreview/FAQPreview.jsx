"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const FAQPreview = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How long does delivery take?",
            answer: "Standard delivery arrives within 5–7 business days. Express shipping is available at checkout.",
        },
        {
            question: "Are your formulations cruelty-free?",
            answer: "Yes. All products are cruelty-free, vegan, and ethically sourced.",
        },
        {
            question: "What is your return policy?",
            answer: "Returns are accepted only for defective opened items. We recommend consultation before purchase.",
        },
        {
            question: "How can I track my shipment?",
            answer: "A tracking link will be sent via email once your order is shipped.",
        },
    ];

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-[#FCFBF9]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="flex flex-col lg:flex-row gap-10 md:gap-14">

                    {/* Header */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-20 space-y-4 md:space-y-6">

                            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-rose-400 uppercase block">
                                Information
                            </span>

                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-stone-900 leading-tight">
                                Common <br />
                                <span className="italic font-serif">Inquiries</span>
                            </h2>

                            <p className="text-sm sm:text-base text-stone-500 font-light max-w-sm">
                                Find quick answers to the most common questions.
                            </p>

                            <Link
                                href="/faq"
                                className="group inline-flex items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-widest text-stone-900"
                            >
                                Full Help Center
                                <span className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-300">
                                    <FiArrowRight size={14} />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Accordion */}
                    <div className="lg:w-2/3 border-t border-stone-200">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-stone-200">

                                <button
                                    onClick={() =>
                                        setActiveIndex(activeIndex === index ? null : index)
                                    }
                                    className="w-full py-4 md:py-6 flex items-center justify-between text-left"
                                >
                                    <h3
                                        className={`text-sm sm:text-base md:text-lg transition-all duration-300 ${activeIndex === index
                                            ? "text-rose-400"
                                            : "text-stone-800"
                                            }`}
                                    >
                                        {faq.question}
                                    </h3>

                                    <div className="text-stone-400">
                                        {activeIndex === index ? (
                                            <FiMinus size={16} />
                                        ) : (
                                            <FiPlus size={16} />
                                        )}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-4 md:pb-6 text-xs sm:text-sm text-stone-500 font-light leading-relaxed max-w-xl">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQPreview;