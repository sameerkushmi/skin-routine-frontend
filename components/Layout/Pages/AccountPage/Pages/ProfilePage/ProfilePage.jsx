'use client';

import { useEffect, useState } from "react";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiCamera, FiCheckCircle } from "react-icons/fi";
import { useMyContext } from "@/components/utils/Context/Context";
import AccountPage from "../../AccountPage";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfilePage() {
    const { user } = useMyContext(); // Added setUser
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        avatar: null,
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                avatar: null,
            });
            setPreview(user.avatar?.url || null);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar" && files[0]) {
            setForm({ ...form, avatar: files[0] });
            setPreview(URL.createObjectURL(files[0]));
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

            await api.put(`/users/update`, formData);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <AccountPage>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto p-4 md:p-8"
            >
                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">

                    {/* Header Section */}
                    <div className="relative h-32 bg-slate-900 overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-200 via-slate-400 to-slate-700"></div>
                    </div>

                    <div className="px-8 pb-10">
                        <form onSubmit={handleSubmit} className="relative -mt-16">

                            {/* Avatar & Basic Info */}
                            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10">
                                <div className="relative group mx-auto md:mx-0">
                                    <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl overflow-hidden">
                                        <div className="w-full h-full rounded-[1.25rem] overflow-hidden bg-slate-100 border border-slate-100">
                                            {preview ? (
                                                <Image fill src={preview} className="w-full h-full object-cover" alt="Profile" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-slate-300">
                                                    <FiUser size={48} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 bg-white text-slate-900 p-2.5 rounded-2xl cursor-pointer shadow-lg hover:bg-slate-50 transition-all border border-slate-100">
                                        <FiCamera size={18} />
                                        <input type="file" name="avatar" hidden onChange={handleChange} accept="image/*" />
                                    </label>
                                </div>

                                <div className="text-center md:text-left space-y-1 pb-2">
                                    <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
                                        {form.name || "Your Name"}
                                        <FiCheckCircle className="text-blue-500" size={18} />
                                    </h1>
                                    <p className="text-slate-500 font-medium">{user.role || 'Member'}</p>
                                </div>
                            </div>

                            <hr className="border-slate-100 mb-8" />

                            {/* Form Grid */}
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Personal Details</h3>
                                </div>

                                <Input
                                    label="Full Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    icon={<FiUser />}
                                    placeholder="Enter your full name"
                                />

                                <Input
                                    label="Email Address"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    icon={<FiMail />}
                                    disabled
                                    className="bg-slate-50 text-slate-400 cursor-not-allowed border-slate-100"
                                />

                                <Input
                                    label="Phone Number"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    icon={<FiPhone />}
                                    placeholder="+1 234 567 890"
                                />

                                <div className="md:col-span-2 pt-6 flex justify-end items-center gap-4 border-t border-slate-100 mt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:bg-slate-400 active:scale-[0.98]"
                                    >
                                        {loading ? "Saving Changes..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </AccountPage>
    );
}

const Input = ({ label, icon, className = "", ...props }) => (
    <div className="space-y-2 group">
        <label className="text-[13px] font-bold flex items-center gap-2 text-slate-500 group-focus-within:text-slate-900 transition-colors">
            <span className="text-slate-400">{icon}</span> {label}
        </label>
        <input
            {...props}
            className={`w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-300 ${className}`}
        />
    </div>
);