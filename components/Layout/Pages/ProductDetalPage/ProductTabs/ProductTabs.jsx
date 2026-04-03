"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState("description");

    const tabs = [
        { id: "description", label: "Description" },
        { id: "usage", label: "How to Use" },
        { id: "ingredients", label: "Ingredients" },
        { id: "info", label: "Additional Info" },
    ];

    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-16">

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap justify-center border-b border-stone-200 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-6 py-4 text-sm font-medium transition ${activeTab === tab.id
                            ? "text-slate-900"
                            : "text-stone-400 hover:text-slate-700"
                            }`}
                    >
                        {tab.label}

                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="tabIndicator"
                                className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-stone-600 leading-relaxed space-y-6"
                >
                    {/* DESCRIPTION */}
                    {activeTab === "description" && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Product Description
                            </h3>

                            <p>{product?.description}</p>
                        </div>
                    )}

                    {/* HOW TO USE */}
                    {activeTab === "usage" && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-900">
                                How to Use
                            </h3>

                            <div className="list-decimal pl-6 space-y-2">
                                {product?.usage?.map((step, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <h2>
                                            {
                                                step.step
                                            }
                                        </h2>
                                        :
                                        <p>
                                            {step.instruction}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* INGREDIENTS */}
                    {activeTab === "ingredients" && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Ingredients
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {product?.ingredients?.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 bg-stone-100 rounded-full text-sm"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ADDITIONAL INFO */}
                    {activeTab === "info" && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Additional Information
                            </h3>

                            {
                                product.additionalInfo && (
                                    <p>
                                        {product.additionalInfo}
                                    </p>
                                )
                            }
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default ProductTabs;