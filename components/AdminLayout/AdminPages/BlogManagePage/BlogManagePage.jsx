"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiEdit, FiTrash2, FiPlus, FiCalendar, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";
import AdminLayout from "../../AdminLayout";
import api from "@/components/utils/Api/api";
import Link from "next/link";
import DeleteConfirm from "@/components/Shared/DeleteConfirm/DeleteConfirm";

export default function BlogManagePage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchBlogs = async () => {
        try {
            const { data } = await api.get("/blogs");
            setBlogs(data.blogs);
        } catch (error) {
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleOpenConfirm = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            setDeleteLoading(true);
            await api.delete(`/blogs/${deleteId}`);
            toast.success("Blog deleted successfully");
            setConfirmOpen(false);
            setDeleteId(null);
            setBlogs(blogs.filter((b) => b._id !== deleteId));
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error("Delete failed");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">Manage Content</h1>
                        <p className="text-stone-500 mt-1 text-sm sm:text-base">Create, edit, and organize your blog stories.</p>
                    </div>
                    <Link
                        href="/admin/blogs/add"
                        className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all shadow-lg shadow-stone-200 active:scale-95 text-sm sm:text-base"
                    >
                        <FiPlus className="text-lg" /> New Post
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-60 sm:h-72 rounded-2xl bg-stone-100 animate-pulse" />
                        ))}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-16 sm:py-20 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                        <FiFileText className="mx-auto text-3xl sm:text-4xl text-stone-300 mb-3 sm:mb-4" />
                        <p className="text-stone-500 font-medium text-sm sm:text-base">No blogs found. Start by creating one!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        <AnimatePresence>
                            {blogs.map((blog) => (
                                <motion.div
                                    key={blog._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ y: -2 }}
                                    className="group bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300"
                                >
                                    <div className="relative w-full h-44 sm:h-56 overflow-hidden">
                                        <Link href={`/blog/${blog._id}`} className="absolute inset-0">
                                            <Image
                                                src={blog.heroImage?.url}
                                                alt={blog.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Link>
                                    </div>

                                    <div className="p-4 sm:p-6">
                                        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 sm:mb-3">
                                            <FiCalendar />
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </div>

                                        <h2 className="text-base sm:text-xl font-bold text-stone-800 line-clamp-2 leading-snug mb-2 sm:mb-3 group-hover:text-stone-900 transition-colors">
                                            <Link href={`/blog/${blog._id}`} className="block">
                                                {blog.title}
                                            </Link>
                                        </h2>

                                        <p className="text-stone-500 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed mb-4 sm:mb-6">
                                            {blog.excerpt}
                                        </p>

                                        <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-stone-50">
                                            <Link
                                                href={`/admin/blogs/edit/${blog._id}`}
                                                className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-xl bg-stone-50 text-stone-600 hover:bg-stone-900 hover:text-white font-semibold text-[10px] sm:text-xs transition-all"
                                            >
                                                <FiEdit /> Edit
                                            </Link>

                                            <button
                                                onClick={() => handleOpenConfirm(blog._id)}
                                                className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                                title="Delete Post"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <DeleteConfirm
                    isOpen={confirmOpen}
                    onClose={() => !deleteLoading && setConfirmOpen(false)}
                    onConfirm={handleDelete}
                    loading={deleteLoading}
                />
            </div>
        </AdminLayout>
    );
}