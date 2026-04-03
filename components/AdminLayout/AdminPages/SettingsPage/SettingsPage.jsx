"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiUser,
    FiSave,
    FiLoader,
    FiCamera,
    FiEye,
    FiEyeOff,
    FiShield,
    FiCheck
} from "react-icons/fi";
import toast from "react-hot-toast";
import api from "@/components/utils/Api/api";
import AdminLayout from "../../AdminLayout";
import { useMyContext } from "@/components/utils/Context/Context";

export default function AdminSettingsPage() {
    const [profile, setProfile] = useState({ name: "", email: "" });
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const { fetchUser, user } = useMyContext()

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPassword({ ...password, [e.target.name]: e.target.value });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2000000) return toast.error("Image must be under 2MB");
        setAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const strengthMetrics = (pwd) => {
        if (!pwd) return { label: "No Password", color: "bg-stone-100", width: "0%" };
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        const levels = [
            { label: "Weak", color: "bg-red-400", width: "25%" },
            { label: "Fair", color: "bg-orange-300", width: "50%" },
            { label: "Good", color: "bg-blue-300", width: "75%" },
            { label: "Strong", color: "bg-emerald-400", width: "100%" },
        ];
        return levels[score - 1] || levels[0];
    };

    const strength = strengthMetrics(password.newPassword);

    const updateProfile = async () => {
        try {
            setProfileLoading(true);
            const formData = new FormData();
            formData.append("name", profile.name);
            formData.append("email", profile.email);
            if (avatar) formData.append("avatar", avatar);

            await api.put("/users/update", formData);
            toast.success("Profile identity updated");
            fetchUser()
            setProfile({ name: "", email: "" });
            setAvatar(null);
            setPreview(null);
        } catch {
            toast.error("Update synchronization failed");
        } finally {
            setProfileLoading(false);
        }
    };

    const updatePassword = async () => {
        if (password.newPassword !== password.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setPasswordLoading(true);
            await api.put("/users/change/password", password);
            toast.success("Password updated");
            setPassword({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.log("update password error: ", error?.response?.data?.message || error)
            toast.error(error?.response?.data?.message || "Password update failed");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <AdminLayout>
            <section className="min-h-screen bg-[#FDFCFB] py-12 px-4 sm:py-20 sm:px-16">
                <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">

                    {/* --- HEADER --- */}
                    <header className="space-y-1 sm:space-y-2">
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-pink-500 uppercase">
                            System Configuration
                        </motion.span>
                        <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 tracking-tight">
                            Admin <span className="text-stone-300 italic font-light">Settings</span>
                        </h1>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">

                        {/* --- LEFT: PROFILE SECTION --- */}
                        <div className="lg:col-span-7 space-y-6 sm:space-y-10">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] border border-stone-50">
                                <div className="flex items-center justify-between mb-6 sm:mb-8">
                                    <h2 className="text-lg sm:text-xl font-serif text-stone-800 tracking-tight">Public Profile</h2>
                                    <FiUser className="text-stone-300" />
                                </div>

                                <div className="space-y-6 sm:space-y-8">
                                    {/* Avatar Upload */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pb-4">
                                        <div className="relative group w-20 h-20 sm:w-28 sm:h-28">
                                            <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-50 border-2 border-stone-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-[0.98]">
                                                {preview ? (
                                                    <img src={preview} className="w-full h-full object-cover" alt="Admin Preview" />
                                                ) : (
                                                    <FiUser className="text-3xl sm:text-4xl text-stone-200" />
                                                )}
                                            </div>
                                            <label className="absolute inset-0 bg-stone-900/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl cursor-pointer backdrop-blur-[2px]">
                                                <FiCamera className="text-white text-lg sm:text-xl mb-1" />
                                                <span className="text-[8px] sm:text-[10px] text-white font-bold uppercase tracking-tighter">Edit</span>
                                                <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                                            </label>
                                        </div>
                                        <div className="text-center sm:text-left space-y-1">
                                            <p className="text-xs sm:text-sm font-medium text-stone-800">Administrator Avatar</p>
                                            <p className="text-[8px] sm:text-xs text-stone-400 max-w-[140px] sm:max-w-[180px]">JPG, GIF or PNG. 2MB max for optimal performance.</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:gap-6">
                                        <div className="relative">
                                            <input id="full-name" name="name" value={profile.name} onChange={handleProfileChange} placeholder=" " className="peer w-full bg-transparent border-b border-stone-200 py-2 sm:py-3 focus:outline-none focus:border-stone-900 transition-colors text-sm sm:text-base" />
                                            <label htmlFor="full-name" className="absolute left-0 top-2 sm:top-3 text-stone-400 text-[10px] sm:text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Full Name</label>
                                        </div>
                                        <div className="relative">
                                            <input id="email-address" name="email" value={profile.email} onChange={handleProfileChange} placeholder=" " className="peer w-full bg-transparent border-b border-stone-200 py-2 sm:py-3 focus:outline-none focus:border-stone-900 transition-colors text-sm sm:text-base" />
                                            <label htmlFor="email-address" className="absolute left-0 top-2 sm:top-3 text-stone-400 text-[10px] sm:text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Email Address</label>
                                        </div>
                                    </div>

                                    <button
                                        onClick={updateProfile}
                                        disabled={profileLoading}
                                        className="disabled:cursor-not-allowed w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-stone-900 text-white rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-stone-800 transition-all active:scale-95 disabled:opacity-50 text-xs sm:text-sm">
                                        {profileLoading ? <FiLoader className="animate-spin" /> : <FiSave className="text-stone-400" />}
                                        <span>Save Changes</span>
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* --- RIGHT: SECURITY SECTION --- */}
                        <div className="lg:col-span-5 space-y-6 sm:space-y-10">
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#1C1C1C] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl">
                                <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
                                    <div className="p-2 bg-white/10 rounded-xl text-pink-400">
                                        <FiShield size={16} sm={20} />
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-serif tracking-tight">Security</h2>
                                </div>

                                <div className="space-y-4 sm:space-y-8">
                                    {/* Passwords */}
                                    {[
                                        { id: 'current', name: 'currentPassword', label: 'Current Password' },
                                        { id: 'new', name: 'newPassword', label: 'New Password' },
                                        { id: 'confirm', name: 'confirmPassword', label: 'Confirm Password' }
                                    ].map((f) => (
                                        <div key={f.id} className="relative group">
                                            <input
                                                id={f.id}
                                                type={showPassword[f.id] ? "text" : "password"}
                                                name={f.name}
                                                value={password[f.name]}
                                                onChange={handlePasswordChange}
                                                placeholder=" "
                                                className="peer w-full bg-transparent border-b border-white/10 py-2 sm:py-3 focus:outline-none focus:border-pink-500 transition-colors text-sm sm:text-base"
                                            />
                                            <label htmlFor={f.id} className="absolute left-0 top-2 sm:top-3 text-white/30 text-[10px] sm:text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink-400 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">{f.label}</label>
                                            <button
                                                onClick={() => setShowPassword(s => ({ ...s, [f.id]: !s[f.id] }))}
                                                className="absolute right-0 top-2 sm:top-3 text-white/20 hover:text-white transition-colors"
                                            >
                                                {showPassword[f.id] ? <FiEyeOff size={14} sm={16} /> : <FiEye size={14} sm={16} />}
                                            </button>
                                        </div>
                                    ))}

                                    {password.confirmPassword && (
                                        <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-xs mt-1 sm:mt-2">
                                            {password.newPassword === password.confirmPassword ? (
                                                <>
                                                    <FiCheck className="text-emerald-400" />
                                                    <span className="text-emerald-400">Passwords match</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-red-400">Passwords do not match</span>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* Strength Indicator */}
                                    <AnimatePresence>
                                        {password.newPassword && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                <div className="flex justify-between items-center mb-1 sm:mb-2">
                                                    <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40 font-bold">Integrity Level</span>
                                                    <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                                                </div>
                                                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div className={`h-full ${strength.color}`} initial={{ width: 0 }} animate={{ width: strength.width }} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <button
                                        disabled={
                                            passwordLoading ||
                                            !password.currentPassword ||
                                            !password.newPassword ||
                                            password.newPassword !== password.confirmPassword
                                        }
                                        onClick={updatePassword}
                                        className="w-full py-3 sm:py-4 bg-white text-stone-900 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-stone-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-4 text-xs sm:text-sm">
                                        {passwordLoading ? <FiLoader className="animate-spin" /> : <FiSave className="text-stone-400" />}
                                        <span>Save Password</span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Tip Card */}
                            <div className="p-4 sm:p-8 border border-stone-100 rounded-[1.5rem] sm:rounded-[2rem] bg-stone-50/50 text-[8px] sm:text-xs">
                                <p className="leading-relaxed italic">
                                    "Security is not a product, but a process. Ensure your credentials contain mixed casing and unique symbols."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}