'use client';

import { useState } from "react";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "@/components/utils/Api/api";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter your email address");

        try {
            setLoading(true);
            const { data } = await api.post("/auth/forgot-password", { email });
            toast.success(data.message || "Reset link sent! Check your Email 💌");
            setEmail("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-teal-50 px-4">

            {/* Soft Ambient Background Blobs */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative w-full max-w-md">
                {/* Back to Login Link */}
                <Link href="/login" className="flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors mb-6 group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to login
                </Link>

                <div className="bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] p-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-2xl shadow-lg shadow-pink-200 mb-4">
                            <FiMail className="text-white text-2xl" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                            No worries! Enter your email below and we'll <br />
                            send you a secure reset link.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 focus:bg-white outline-none transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full overflow-hidden group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-500 transition-all duration-300 ${loading ? 'opacity-50' : 'group-hover:scale-105'}`}></div>
                            <div className="relative py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            Remember your password?{" "}
                            <Link href="/login" className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}