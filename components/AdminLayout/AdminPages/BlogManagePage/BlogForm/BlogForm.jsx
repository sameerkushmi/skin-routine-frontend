"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiImage, FiType, FiLayers, FiCheck } from "react-icons/fi";

export default function BlogForm({ initialData = {}, onSubmit, loading }) {
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        category: "",
        intro: "",
        conclusion: "",
        heroImage: null,
        sections: [],
    });

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setForm({
                title: initialData.title || "",
                excerpt: initialData.excerpt || "",
                category: initialData.category || "",
                intro: initialData.article?.intro || "",
                conclusion: initialData.article?.conclusion || "",
                heroImage: null,
                sections:
                    initialData.article?.sections?.map((s) => ({
                        ...s,
                        content: Array.isArray(s.content) ? s.content[0] : s.content,
                        list: Array.isArray(s.list) ? s.list.join(", ") : s.list,
                    })) || [],
            });
        }
    }, [initialData]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleHeroImage = (e) => setForm({ ...form, heroImage: e.target.files[0] });

    const addSection = () => {
        setForm({
            ...form,
            sections: [...form.sections, { heading: "", content: "", list: "", image: null }],
        });
    };

    const updateSection = (index, field, value) => {
        const updated = [...form.sections];
        updated[index][field] = value;
        setForm({ ...form, sections: updated });
    };

    const handleSectionImage = (index, file) => {
        const updated = [...form.sections];
        updated[index].image = file;
        setForm({ ...form, sections: updated });
    };

    const removeSection = (index) => {
        setForm({ ...form, sections: form.sections.filter((_, i) => i !== index) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("excerpt", form.excerpt);
        formData.append("category", form.category);
        if (form.heroImage) formData.append("heroImage", form.heroImage);

        const article = {
            intro: form.intro,
            conclusion: form.conclusion,
            sections: form.sections.map((sec) => ({
                heading: sec.heading,
                content: sec.content ? [sec.content] : [],
                list: sec.list ? sec.list.split(",").map((item) => item.trim()) : [],
            })),
        };
        formData.append("article", JSON.stringify(article));
        form.sections.forEach((sec) => {
            if (sec.image) formData.append("sectionImages", sec.image);
        });
        onSubmit(formData);
    };

    const inputStyle =
        "w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:ring-1 focus:ring-stone-600 focus:border-transparent outline-none transition-all placeholder:text-stone-400";
    const labelStyle = "block text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-stone-500 mb-2 ml-1";

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto pb-16 sm:pb-20 px-4 sm:px-6">
            {/* Global Settings Section */}
            <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-stone-100 mb-8 sm:mb-10">
                <div className="mb-6 sm:mb-8">
                    <label className={labelStyle}>Blog Title</label>
                    <div className="relative">
                        <FiType className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="The future of design..."
                            className={`${inputStyle} pl-10 sm:pl-11`}
                            required
                        />
                    </div>
                </div>

                <div className="mb-6 sm:mb-8">
                    <label className={labelStyle}>Category</label>
                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="e.g., Design, Technology..."
                        className={`${inputStyle} pl-3 sm:pl-4`}
                        required
                    />
                </div>

                <div className="mb-6 sm:mb-8">
                    <label className={labelStyle}>Hero Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-100/50 hover:border-stone-400 transition-all">
                        <div className="flex flex-col items-center justify-center pt-4 sm:pt-5 pb-4 sm:pb-6">
                            <FiImage className="text-xl sm:text-2xl text-stone-400 mb-1 sm:mb-2" />
                            <p className="text-xs sm:text-sm text-stone-500 truncate w-full text-center">
                                {form.heroImage ? form.heroImage.name : "Click to upload banner image"}
                            </p>
                        </div>
                        <input type="file" className="hidden" onChange={handleHeroImage} />
                    </label>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <label className={labelStyle}>Excerpt (Summary)</label>
                        <textarea
                            name="excerpt"
                            value={form.excerpt}
                            onChange={handleChange}
                            rows="2"
                            className={inputStyle}
                            placeholder="Brief teaser for the blog card..."
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>Article Intro</label>
                        <textarea
                            name="intro"
                            value={form.intro}
                            onChange={handleChange}
                            rows="4"
                            className={inputStyle}
                            placeholder="Hook your readers here..."
                        />
                    </div>
                </div>
            </div>

            {/* Dynamic Content Sections */}
            <div className="mb-10 sm:mb-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 px-2 sm:px-4 gap-3 sm:gap-0">
                    <div className="flex items-center gap-2">
                        <FiLayers className="text-stone-400" />
                        <h2 className="text-lg sm:text-xl font-bold text-stone-800">Content Sections</h2>
                    </div>
                    <button
                        type="button"
                        onClick={addSection}
                        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider bg-stone-900 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-stone-800 transition-all active:scale-95 shadow-lg shadow-stone-200"
                    >
                        <FiPlus /> Add Section
                    </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <AnimatePresence>
                        {form.sections.map((sec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white border border-stone-100 shadow-sm rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 relative group"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeSection(i)}
                                    className="absolute top-4 sm:top-6 right-4 sm:right-6 p-1.5 sm:p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                >
                                    <FiTrash2 size={16} />
                                </button>

                                <div className="grid gap-4 sm:gap-6">
                                    <input
                                        value={sec.heading}
                                        onChange={(e) => updateSection(i, "heading", e.target.value)}
                                        placeholder="Section Heading"
                                        className="text-base sm:text-lg font-bold border-b border-stone-200 outline-none focus:ring-0 p-1 sm:p-0 placeholder:text-stone-300 w-full"
                                    />

                                    <textarea
                                        value={sec.content}
                                        onChange={(e) => updateSection(i, "content", e.target.value)}
                                        placeholder="Start writing section content..."
                                        className={`${inputStyle} resize-none`}
                                        rows="4"
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 items-end">
                                        <div>
                                            <label className={labelStyle}>Bulleted List (Comma separated)</label>
                                            <input
                                                value={sec.list}
                                                onChange={(e) => updateSection(i, "list", e.target.value)}
                                                placeholder="Point A, Point B, Point C"
                                                className={inputStyle}
                                            />
                                        </div>
                                        <label className="flex items-center justify-center px-3 sm:px-4 py-2 border border-stone-200 rounded-xl cursor-pointer hover:bg-stone-50 transition-all text-stone-500 text-sm sm:text-base overflow-hidden">
                                            <FiImage className="mr-1 sm:mr-2 flex-shrink-0" />
                                            <span className="truncate">{sec.image ? sec.image.name : "Section Image"}</span>
                                            <input type="file" className="hidden" onChange={(e) => handleSectionImage(i, e.target.files[0])} />
                                        </label>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Submission Area */}
            <div className="border-t border-stone-100 pt-6 sm:pt-10 px-2 sm:px-4">
                <div className="bg-stone-50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <div>
                        <h3 className="font-bold text-stone-800 text-sm sm:text-base">Article Conclusion</h3>
                        <p className="text-xs sm:text-sm text-stone-500">Wrap up your story with a final thought.</p>
                    </div>
                    <textarea
                        name="conclusion"
                        value={form.conclusion}
                        onChange={handleChange}
                        className={`${inputStyle} md:max-w-md mt-2 sm:mt-0`}
                        rows="2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 sm:mt-8 bg-stone-900 text-white py-3 sm:py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm sm:text-base hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 disabled:bg-stone-300 flex items-center justify-center gap-2 sm:gap-3"
                >
                    {loading ? "Syncing to database..." : <><FiCheck /> Publish Blog Post</>}
                </button>
            </div>
        </form>
    );
}