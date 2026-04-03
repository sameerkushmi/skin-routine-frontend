"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLock, FiShield, FiArrowRight, FiLoader, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import AccountPage from "../../AccountPage";
import api from "@/components/utils/Api/api";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // --- Password Strength Logic ---
    const strengthMetrics = useMemo(() => {
        const val = password.newPassword;
        if (!val) return { score: 0, label: "", color: "bg-stone-100" };

        let score = 0;
        if (val.length > 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const themes = [
            { label: "Weak", color: "bg-red-400" },
            { label: "Fair", color: "bg-orange-300" },
            { label: "Good", color: "bg-blue-300" },
            { label: "Strong", color: "bg-emerald-400" },
        ];

        return { score, ...themes[score - 1] };
    }, [password.newPassword]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }));
    };

    const changePassword = async (e) => {
        e.preventDefault()

        if (!password.currentPassword || !password.newPassword) {
            return toast.error("Please fill in all fields");
        }
        if (password.newPassword !== password.confirmPassword) {
            return toast.error("Passwords do not match");
        }
        if (strengthMetrics.score < 2) {
            return toast.error("Please use a stronger password");
        }

        try {
            setLoading(true);
            await api.put("/users/change/password", password);
            toast.success("Security settings updated");
            setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AccountPage>
            <section className="min-h-screen bg-[#FCFBFA] py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-50/50 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-stone-100/60 rounded-full blur-[100px] -z-10" />

                <div className="max-w-4xl mx-auto relative">
                    <header className="mb-12">
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-bold tracking-[0.3em] text-pink-400 uppercase">
                            Security Protocol
                        </motion.span>
                        <motion.h1 className="text-5xl md:text-6xl font-serif text-stone-900 mt-3 tracking-tight">
                            Account <span className="italic font-light text-stone-400">Settings</span>
                        </motion.h1>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 space-y-6">
                            <div className="p-8 bg-white border border-stone-100 rounded-[2rem] shadow-sm">
                                <FiShield className="text-2xl text-pink-300 mb-4" />
                                <h3 className="font-medium text-stone-900">Privacy First</h3>
                                <p className="text-sm text-stone-500 mt-2 leading-relaxed">
                                    Updates take effect immediately. Ensure your recovery email is active before changing.
                                </p>
                            </div>
                        </div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-white/[0.8] backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-white">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-stone-900 rounded-xl text-white shadow-lg shadow-stone-200">
                                        <FiLock size={18} />
                                    </div>
                                    <h2 className="text-2xl font-serif text-stone-800">Change Password</h2>
                                </div>
                                <button
                                    onClick={() => setShowPasswords(!showPasswords)}
                                    className="text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
                                >
                                    {showPasswords ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    {showPasswords ? "Hide" : "Show"}
                                </button>
                            </div>

                            <form onSubmit={changePassword}>
                                <div className="space-y-10">
                                    {[
                                        { label: "Current Password", name: "currentPassword" },
                                        { label: "New Password", name: "newPassword" },
                                        { label: "Confirm New Password", name: "confirmPassword" },
                                    ].map((field) => (
                                        <div key={field.name} className="relative group">
                                            <input
                                                type={showPasswords ? "text" : "password"}
                                                name={field.name}
                                                value={password[field.name]}
                                                onChange={handleInputChange}
                                                placeholder=" "
                                                className="block w-full px-0 py-3 text-stone-900 bg-transparent border-b border-stone-200 appearance-none focus:outline-none focus:ring-0 focus:border-stone-900 peer transition-all"
                                            />
                                            <label className="absolute text-sm text-stone-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stone-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">
                                                {field.label}
                                            </label>

                                            {/* Password Strength Meter (Only for New Password) */}
                                            {field.name === "newPassword" && password.newPassword && (
                                                <div className="absolute -bottom-6 left-0 w-full">
                                                    <div className="flex gap-1 h-[3px] w-full">
                                                        {[1, 2, 3, 4].map((step) => (
                                                            <div
                                                                key={step}
                                                                className={`h-full flex-1 transition-all duration-500 rounded-full ${step <= strengthMetrics.score ? strengthMetrics.color : "bg-stone-100"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="flex justify-between mt-1.5">
                                                        <span className="text-[10px] uppercase tracking-tighter font-bold text-stone-400">Strength</span>
                                                        <span className={`text-[10px] font-bold uppercase ${strengthMetrics.color.replace('bg-', 'text-')}`}>
                                                            {strengthMetrics.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-16 flex flex-col md:flex-row items-center gap-6 justify-between">
                                    <p className="text-[11px] text-stone-400 leading-relaxed max-w-[220px]">
                                        Use symbols, numbers, and capital letters for maximum security.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full md:w-auto group relative inline-flex items-center justify-center gap-3 bg-stone-900 hover:bg-stone-800 text-white px-10 py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-70 shadow-xl shadow-stone-200"
                                    >
                                        {loading ? <FiLoader className="animate-spin" /> : (
                                            <>
                                                <span className="font-semibold tracking-wide">Secure Update</span>
                                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </AccountPage>
    );
}