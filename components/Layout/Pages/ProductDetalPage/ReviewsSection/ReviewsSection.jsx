"use client";

import { useEffect, useState } from "react";
import { FaStar, FaCheckCircle, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";
import Image from "next/image";
import { useMyContext } from "@/components/utils/Context/Context";
import DeleteConfirm from "@/components/Shared/DeleteConfirm/DeleteConfirm";

const ReviewsSection = ({ id }) => {
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(0);

    // ✅ Delete confirm states
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { user } = useMyContext()

    const fetchReviews = async () => {
        try {
            const { data } = await api.get(`/reviews/product/${id}`);
            setReviews(data.reviews);
            setAvgRating(data.avgRating);
            setTotalReviews(data.totalReviews);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [id]);

    const distribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        return totalReviews ? Math.round((count / totalReviews) * 100) : 0;
    });

    const postReview = async () => {
        if (!rating || !comment) return alert("Please provide rating and comment");
        try {
            setLoading(true);
            await api.post(`/reviews/create/${id}`, { rating, comment });
            setComment("");
            setRating(0);
            fetchReviews();
            toast.success("Review posted");
        } catch (error) {
            toast.error("Failed to post review");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Open confirm modal
    const handleOpenConfirm = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteId) return

        try {
            setDeleteLoading(true)
            await api.delete(`/reviews/delete/${deleteId}`);
            fetchReviews();
            setConfirmOpen(false);
            setDeleteId(null);
            toast.success("Review deleted");
        } catch {
            toast.error("Failed to delete review");
        } finally {
            setDeleteLoading(false);
        }
    };

    const startEdit = (review) => {
        setEditId(review._id);
        setEditComment(review.comment);
        setEditRating(review.rating);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditComment("");
        setEditRating(0);
    };

    const saveEdit = async (reviewId) => {
        try {
            await api.put(`/reviews/update/${reviewId}`, { rating: editRating, comment: editComment });
            cancelEdit();
            fetchReviews();
            toast.success("Review updated");
        } catch {
            toast.error("Failed to update review");
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-24 bg-[#FCFBFA]">
            <div className="grid lg:grid-cols-12 gap-16">

                {/* Left: Summary & Stats */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="flex items-end gap-4">
                        <span className="text-7xl font-light text-slate-900 tracking-tighter">{avgRating}</span>
                        <div className="pb-2 space-y-1">
                            <div className="flex text-amber-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < Math.round(avgRating) ? "opacity-100" : "opacity-20"} />
                                ))}
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{totalReviews} Reviews</p>
                        </div>
                    </div>

                    {/* Rating Bars */}
                    <div className="space-y-3">
                        {distribution.map((percent, i) => (
                            <div key={i} className="flex items-center gap-4 text-sm">
                                <span className="w-3 text-stone-400 font-medium">{5 - i}</span>
                                <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percent}%` }}
                                        className="h-full bg-slate-800"
                                    />
                                </div>
                                <span className="w-8 text-right text-stone-400 text-xs">{percent}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Write Review */}
                    <div className="p-8 rounded-[2rem] bg-white border border-stone-100 shadow-sm space-y-6">
                        <div className="space-y-1">
                            <p className="text-sm text-stone-500">How would you rate this product?</p>
                        </div>

                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-transform active:scale-90"
                                >
                                    <FaStar
                                        className={`w-6 h-6 transition-colors ${star <= (hover || rating) ? "text-amber-400" : "text-stone-200"}`}
                                    />
                                </button>
                            ))}
                        </div>

                        <textarea
                            placeholder="Describe your experience..."
                            className="w-full bg-stone-50 border-none rounded-2xl p-4 text-sm focus:ring-1 focus:ring-slate-900 transition-all outline-none"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            onClick={postReview}
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-full font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                        >
                            {loading ? "Posting..." : "Post Review"}
                        </button>
                    </div>
                </div>

                {/* Right: Review List */}
                <div className="lg:col-span-8 space-y-12">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <motion.div key={review._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group bg-white p-6 rounded-2xl shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-slate-500 font-serif italic text-lg border border-stone-200 overflow-hidden">
                                            {review.user.avatar ? (
                                                <Image fill src={review.user.avatar.url} alt={review.user.name} className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                review.user.name[0]
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-slate-900">{review.user.name}</h4>
                                                <FaCheckCircle className="text-green-500 text-[10px]" title="Verified Purchase" />
                                            </div>
                                            <div className="flex text-amber-400 text-[10px] mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < review.rating ? "opacity-100" : "opacity-20"} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-stone-400 font-medium uppercase tracking-tighter">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="pl-16 group">
                                    {editId === review._id ? (
                                        <div className="bg-white rounded-2xl p-1 border border-stone-100 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                                            <textarea
                                                value={editComment}
                                                onChange={(e) => setEditComment(e.target.value)}
                                                className="w-full bg-stone-50 border-none rounded-t-xl p-5 text-sm text-stone-700 focus:ring-0 transition-all outline-none resize-none"
                                                rows="3"
                                                placeholder="Update your thoughts..."
                                            />

                                            <div className="flex items-center justify-between px-4 py-3 bg-white rounded-b-xl border-t border-stone-50">
                                                <div className="flex gap-1.5">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            onClick={() => setEditRating(star)}
                                                            className="transition-transform active:scale-90 hover:scale-110"
                                                        >
                                                            <FaStar className={`w-5 h-5 transition-colors ${star <= editRating ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" : "text-stone-200"
                                                                }`} />
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-600 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => saveEdit(review._id)}
                                                        className="px-6 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-stone-800 shadow-lg shadow-stone-200 transition-all active:scale-95"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-stone-700 leading-relaxed font-normal text-[1.05rem] relative">
                                                <span className="absolute -left-6 top-0 text-stone-200 text-4xl serif select-none">“</span>
                                                {review.comment}
                                            </p>

                                            {/* Action Bar */}
                                            {user && user._id === review.user._id && (
                                                <div className="mt-4 flex gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button
                                                        onClick={() => startEdit(review)}
                                                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 hover:text-indigo-500 transition-colors"
                                                    >
                                                        <FaEdit className="text-[12px]" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenConfirm(review._id)}
                                                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <FaTrash className="text-[12px]" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-stone-100 rounded-[3rem]">
                            <p className="text-stone-400 italic">No reviews yet. Be the first to share your experience.</p>
                        </div>
                    )}
                </div>
            </div>

            <DeleteConfirm
                isOpen={confirmOpen}
                onClose={() => !deleteLoading && setConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={deleteLoading}
            />
        </section>
    );
};

export default ReviewsSection;