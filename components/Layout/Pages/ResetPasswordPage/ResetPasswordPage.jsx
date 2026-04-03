'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "@/components/utils/Api/api";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const getPasswordStrength = (password) => {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        return score;
    };

    const strength = getPasswordStrength(password);

    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = [
        "bg-red-400",
        "bg-orange-400",
        "bg-yellow-400",
        "bg-lime-500",
        "bg-green-500"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            return toast.error("Please fill in all fields");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setLoading(true);
            const { data } = await api.post(`/auth/reset-password/${token}`, { password });

            toast.success(data.message || "Password reset successfully 🎉");

            setPassword('')
            setConfirmPassword('')

            setTimeout(() => {
                router.push("/login");
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!token) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full text-center p-6 sm:p-8 md:p-10 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <FiLock size={26} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Invalid or Expired Link
                </h1>
                <p className="text-gray-500 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
                    For security reasons, reset links are only valid for a short time.
                </p>
                <button
                    onClick={() => router.push("/forgot-password")}
                    className="w-full py-3 text-sm sm:text-base bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
                >
                    Request New Link
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-slate-50 to-white px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md sm:max-w-lg">

                {/* Back button */}
                <button
                    onClick={() => router.push('/login')}
                    className="flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors mb-4 sm:mb-6 group"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs sm:text-sm font-medium">Back to login</span>
                </button>

                <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10">
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            New Password
                        </h1>
                        <p className="text-gray-500 mt-2 text-xs sm:text-sm">
                            Please choose a strong password to secure your account.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                    <FiLock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-3 sm:py-4 text-sm sm:text-base bg-gray-50/50 border border-gray-100 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 focus:bg-white outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                    <FiLock size={18} />
                                </div>
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full pl-11 pr-12 py-4 bg-gray-50/50 border rounded-2xl focus:ring-4 outline-none transition-all ${confirmPassword && password !== confirmPassword
                                        ? "border-red-200 focus:ring-red-500/10"
                                        : "border-gray-100 focus:ring-pink-500/10 focus:border-pink-400 focus:bg-white"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-[10px] text-red-500 font-medium ml-1">Passwords do not match yet</p>
                            )}
                        </div>

                        {password && (
                            <div className="space-y-2">
                                {/* Strength Bar */}
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${strengthColors[strength - 1] || "bg-gray-200"}`}
                                        style={{ width: `${(strength / 5) * 100}%` }}
                                    />
                                </div>

                                {/* Strength Label */}
                                <p className="text-xs font-medium text-gray-500">
                                    Strength:{" "}
                                    <span className={`font-semibold ${strength <= 2 ? "text-red-500" :
                                        strength === 3 ? "text-yellow-500" :
                                            "text-green-600"
                                        }`}>
                                        {strengthLabels[strength - 1] || "Too Weak"}
                                    </span>
                                </p>

                                {/* Rules Checklist */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] sm:text-xs">
                                    <p className={password.length >= 8 ? "text-green-600" : "text-gray-400"}>
                                        ✓ 8+ characters
                                    </p>
                                    <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-gray-400"}>
                                        ✓ Uppercase
                                    </p>
                                    <p className={/[a-z]/.test(password) ? "text-green-600" : "text-gray-400"}>
                                        ✓ Lowercase
                                    </p>
                                    <p className={/[0-9]/.test(password) ? "text-green-600" : "text-gray-400"}>
                                        ✓ Number
                                    </p>
                                    <p className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-gray-400"}>
                                        ✓ Special char
                                    </p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl text-white font-bold tracking-wide shadow-lg transition-all active:scale-[0.97]
                            ${loading
                                    ? "bg-pink-300 cursor-not-allowed"
                                    : "bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 hover:shadow-pink-200"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </span>
                            ) : "Secure My Account"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-400 text-xs mt-8">
                    &copy; {new Date().getFullYear()} Your Brand Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
}