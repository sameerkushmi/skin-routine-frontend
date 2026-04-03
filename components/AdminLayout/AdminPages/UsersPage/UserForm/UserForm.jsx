'use client';

import api from "@/components/utils/Api/api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
// Using Feather and Ionicons for a modern look
import { FiX, FiUser, FiMail, FiPhone, FiLock, FiCamera } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const UserForm = ({ isOpen, onClose, onSave, initialData = null }) => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "user",
        password: "",
        avatar: null,
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                role: initialData.role || "user",
                password: "",
                avatar: null,
            });
            setPreview(initialData.avatar?.url || null);
        } else {
            setForm({ name: "", email: "", phone: "", role: "user", password: "", avatar: null });
            setPreview(null);
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar" && files[0]) {
            setForm({ ...form, avatar: files[0] });
            setPreview(URL.createObjectURL(files[0])); // Create local preview URL
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => {
                if (form[key]) formData.append(key, form[key]);
            });

            const response = initialData
                ? await api.put(`/users/update/${initialData._id}`, formData)
                : await api.post("/users/create", formData);

            toast.success(`User ${initialData ? 'updated' : 'created'}`);
            onSave(response.data.user);
            onClose();
        } catch (err) {
            console.log("admin user error: ", err.response?.data?.message)
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Glassmorphism Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-[100]"
                    />

                    {/* Side Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                                    {initialData ? "Edit User" : "Add New User"}
                                </h2>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Management Portal</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100">
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

                            {/* Avatar Upload Section */}
                            <div className="flex flex-col items-center pb-4">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-slate-400">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <FiUser size={32} className="text-slate-300" />
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-xl cursor-pointer shadow-lg hover:bg-slate-800 transition-colors">
                                        <FiCamera size={16} />
                                        <input type="file" name="avatar" hidden onChange={handleChange} accept="image/*" />
                                    </label>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Profile Picture</p>
                            </div>

                            <div className="space-y-4">
                                <FormInput label="Full Name" name="name" icon={<FiUser />} value={form.name} onChange={handleChange} required placeholder="John Doe" />
                                <FormInput label="Email Address" name="email" type="email" icon={<FiMail />} value={form.email} onChange={handleChange} required placeholder="john@example.com" />
                                <FormInput label="Phone Number" name="phone" icon={<FiPhone />} value={form.phone} onChange={handleChange} placeholder="+1 234 567 890" />

                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
                                        <IoShieldCheckmarkOutline className="text-slate-400" /> Account Role
                                    </label>
                                    <select
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="user">Standard User</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>

                                {!initialData && (
                                    <FormInput label="Password" name="password" type="password" icon={<FiLock />} value={form.password} onChange={handleChange} required placeholder="••••••••" />
                                )}
                            </div>
                        </form>

                        {/* Sticky Footer */}
                        <div className="p-8 border-t border-slate-100 bg-white flex gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-[2] px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 disabled:bg-slate-300 transition-all shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] active:scale-[0.98]"
                            >
                                {loading ? "Processing..." : initialData ? "Save Changes" : "Create Account"}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Reusable Input Component
const FormInput = ({ label, icon, ...props }) => (
    <div className="space-y-2">
        <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
            <span className="text-slate-400">{icon}</span> {label}
        </label>
        <input
            {...props}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
        />
    </div>
);

export default UserForm;