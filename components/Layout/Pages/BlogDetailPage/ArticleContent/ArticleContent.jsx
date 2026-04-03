"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ArticleContent({ intro, sections, conclusion }) {
    return (
        <article className="max-w-3xl mx-auto px-6 py-20">
            {/* Intro with Drop Cap */}
            {intro && (
                <div className="relative mb-16">
                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light italic border-l-4 border-pink-200 pl-8 py-2 first-letter:text-7xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-slate-900 first-letter:leading-[0.8]">
                        {intro}
                    </p>
                    <div className="clear-both" />
                </div>
            )}

            {/* Content Sections */}
            <div className="space-y-16">
                {sections?.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="group"
                    >
                        {section.heading && (
                            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8 tracking-tight">
                                {section.heading}
                            </h2>
                        )}

                        <div className="space-y-6">
                            {section.content?.map((text, i) => (
                                <p key={i} className="text-lg text-slate-600 leading-[1.8] font-light">
                                    {text}
                                </p>
                            ))}
                        </div>

                        {/* Premium List Design */}
                        {section.list && (
                            <ul className="my-10 space-y-4">
                                {section.list.map((item, i) => (
                                    <li key={i} className="flex gap-4 text-lg text-slate-600 font-light">
                                        <span className="text-pink-400 font-serif italic text-xl">0{i + 1}.</span>
                                        <span className="pt-1">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Pull Quote (Optional Logic) */}
                        {section.isQuote && (
                            <blockquote className="my-12 text-center px-10">
                                <p className="text-2xl md:text-3xl font-serif italic text-slate-800 leading-snug">
                                    "{section.content[0]}"
                                </p>
                                <div className="w-12 h-[1px] bg-pink-300 mx-auto mt-6" />
                            </blockquote>
                        )}

                        {/* Enhanced Image with Caption */}
                        {section.image && (
                            <figure className="relative my-16 -mx-4 md:-mx-20">
                                <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                                    <Image
                                        src={section.image.url}
                                        alt={'blog'}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                            </figure>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Conclusion Section */}
            {conclusion && (
                <div className="mt-24 p-8 md:p-12 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-serif text-slate-900 mb-6 flex items-center gap-3">
                            Final Thoughts
                            <div className="h-[1px] flex-grow bg-slate-200" />
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed font-light italic">
                            {conclusion}
                        </p>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-100/50 rounded-full blur-3xl" />
                </div>
            )}
        </article>
    );
}