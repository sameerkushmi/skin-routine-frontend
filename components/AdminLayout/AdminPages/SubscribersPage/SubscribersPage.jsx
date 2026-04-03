"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiTrash2,
    FiLoader,
    FiCalendar,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiInbox,
    FiZap
} from "react-icons/fi";
import toast from "react-hot-toast";
import api from "@/components/utils/Api/api";
import AdminLayout from "../../AdminLayout";
import DeleteConfirm from "@/components/Shared/DeleteConfirm/DeleteConfirm";

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    // ✅ Delete confirm states
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // 🔥 Debounce search
    useEffect(() => {
        setIsSearching(true);
        const timer = setTimeout(() => {
            setPage(1);
            setDebouncedSearch(searchTerm);
            setIsSearching(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const res = await api.get(
                `/subscribers?page=${page}&limit=${limit}&search=${debouncedSearch}`
            );
            setSubscribers(res.data.subscribers || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        } catch (err) {
            toast.error("Failed to sync with database");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, [page, debouncedSearch]);

    // ✅ Open confirm modal
    const handleOpenConfirm = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    // ✅ Confirm delete
    const handleConfirmDelete = async () => {
        if (!deleteId) return;

        try {
            setDeleteLoading(true);
            await api.delete(`/subscribers/${deleteId}`);
            toast.success("Subscriber archive updated");
            setConfirmOpen(false);
            setDeleteId(null);
            fetchSubscribers();
        } catch (err) {
            toast.error("Action restricted");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <AdminLayout>
            <section className="min-h-screen bg-[#FDFCFB] py-16 px-4 md:px-12">
                {/* --- HEADER --- */}
                <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-pink-400 font-bold tracking-[0.2em] text-[10px] uppercase">
                            <FiZap /> Intelligence Portal
                        </div>
                        <h1 className="text-5xl font-serif text-stone-900 tracking-tight">
                            Subscribers <span className="text-stone-300 italic font-light">Insight</span>
                        </h1>
                    </div>

                    <div className="relative group min-w-[320px]">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {isSearching ? (
                                <FiLoader className="animate-spin text-pink-400" size={16} />
                            ) : (
                                <FiSearch className="text-stone-400 group-focus-within:text-stone-900 transition-colors" size={16} />
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Search by identity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-stone-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-stone-100 transition-all text-sm placeholder:text-stone-300"
                        />
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="max-w-6xl mx-auto">
                    {loading && !subscribers.length ? (
                        <div className="flex flex-col items-center justify-center py-48">
                            <FiLoader className="animate-spin text-4xl text-stone-200 mb-6" />
                            <p className="text-stone-400 font-serif italic animate-pulse">
                                Retrieving audience data...
                            </p>
                        </div>
                    ) : subscribers.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] border border-stone-100 py-32 text-center"
                        >
                            <FiInbox className="mx-auto text-5xl text-stone-100 mb-4" />
                            <p className="text-stone-400 font-serif text-xl italic">
                                No records found for this criteria.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] border border-stone-50 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-stone-50/30">
                                        <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                                            Subscriber Identity
                                        </th>
                                        <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                                            Subscription Date
                                        </th>
                                        <th className="px-10 py-6 text-right text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                                            Management
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-50">
                                    <AnimatePresence mode="popLayout">
                                        {subscribers.map((sub) => (
                                            <motion.tr
                                                key={sub._id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                className="group hover:bg-[#FFFCFC] transition-colors"
                                            >
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 text-xs font-bold group-hover:bg-pink-50 group-hover:text-pink-500 transition-all duration-300">
                                                            {sub.email.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-stone-900 font-medium text-sm tracking-tight">
                                                            {sub.email}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-2 text-stone-400 text-sm">
                                                        <FiCalendar className="text-stone-200" />
                                                        {new Date(sub.createdAt).toLocaleDateString("en-US", {
                                                            month: "long",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                </td>

                                                <td className="px-10 py-6 text-right">
                                                    <button
                                                        onClick={() => handleOpenConfirm(sub._id)}
                                                        className="p-3 rounded-xl text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>

                            {/* PAGINATION */}
                            <div className="px-10 py-8 bg-stone-50/50 flex justify-between items-center border-t border-stone-50">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => p - 1)}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-100 text-xs font-bold text-stone-600 hover:shadow-md transition-all disabled:opacity-40"
                                >
                                    <FiChevronLeft /> Previous
                                </button>

                                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                                    Page <span className="text-stone-900">{page}</span> / {totalPages}
                                </span>

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-100 text-xs font-bold text-stone-600 hover:shadow-md transition-all disabled:opacity-40"
                                >
                                    Next <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ✅ DELETE CONFIRM MODAL */}
                <DeleteConfirm
                    isOpen={confirmOpen}
                    onClose={() => !deleteLoading && setConfirmOpen(false)}
                    onConfirm={handleConfirmDelete}
                    loading={deleteLoading}
                />
            </section>
        </AdminLayout>
    );
}