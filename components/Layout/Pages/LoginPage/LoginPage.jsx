"use client";

import { useState } from "react";
import { useMyContext } from "@/components/utils/Context/Context";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiMail, FiLock, FiEye } from "react-icons/fi";
import api from '@/components/utils/Api/api'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const router = useRouter()
    const { loading, setLoading,fetchUser } = useMyContext()
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ prevents page reload

        try {
            setLoading(true)
            const { data } = await api.post('/auth/login', formData)
            fetchUser()
            setFormData({ email: '', password: '' })
            toast.success(data.message)
            setTimeout(() => router.push('/'), 1000)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Invalid credentials') // no reload
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden flex items-center justify-center px-4 md:px-6 selection:bg-pink-100 selection:text-pink-900">

            {/* --- PREMIUM ATMOSPHERIC ELEMENTS --- */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-200/30 blur-[120px] rounded-full mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-100/40 blur-[140px] rounded-full mix-blend-multiply" />

            {/* Decorative Floating "Serum Droplet" or Orb */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-20 w-4 h-4 rounded-full bg-pink-400/20 hidden lg:block"
            />

            <div className="w-full max-w-7xl grid lg:grid-cols-2 items-center gap-12 xl:gap-24 z-10">

                {/* ================= LEFT SIDE (EDITORIAL) ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:block space-y-12"
                >
                    <div className="space-y-6">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-[11px] uppercase tracking-[0.4em] text-pink-500 font-bold"
                        >
                            The Science of Radiance
                        </motion.span>
                        <h1 className="text-6xl xl:text-7xl font-serif text-slate-900 leading-[1.1] tracking-tight">
                            Crafting your <br />
                            <span className="italic font-light serif text-slate-400">ultimate</span> glow.
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-md font-light">
                            Welcome back to your sanctuary. Sign in to access your bespoke
                            dermatology-grade routines and progress tracking.
                        </p>
                    </div>

                    <div className="flex gap-12">
                        {[
                            { label: "Active Users", val: "10k+" },
                            { label: "Custom Formulas", val: "150+" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <h3 className="text-2xl font-serif text-slate-900">{stat.val}</h3>
                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ================= RIGHT SIDE (MODERN CARD) ================= */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[460px] mx-auto"
                >
                    {/* Mobile Logo */}
                    <div className="text-center mb-10 lg:hidden">
                        <span className="text-2xl font-serif tracking-tighter text-slate-900">
                            SKIN<span className="italic text-pink-500 font-light">ROUTINE</span>
                        </span>
                    </div>

                    <div className="relative group">
                        {/* Soft Glow Behind Card */}
                        <div className="absolute -inset-1 bg-gradient-to-tr from-pink-100 to-blue-50 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                        <div className="relative bg-white/70 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 border border-white/60">

                            <div className="mb-4">
                                <h2 className="text-2xl font-serif text-slate-900">Welcome back</h2>
                                <p className="text-slate-400 text-sm mt-1">Please enter your details</p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Email Input */}
                                <div className="group space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">
                                        Identity
                                    </label>
                                    <div className="relative transition-all duration-300">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pink-500 transition-colors" />
                                        <input
                                            value={formData.email}
                                            name="email"
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="email@luxury.com"
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 border border-slate-100 focus:border-pink-200 focus:bg-white outline-none transition-all text-sm placeholder:text-slate-300 shadow-sm focus:shadow-pink-100/50"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="group space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                                            Security
                                        </label>
                                        <Link href="/forgot-password" className="text-[10px] uppercase tracking-widest text-pink-500 font-bold hover:tracking-wider transition-all">
                                            Forgot Password
                                        </Link>
                                    </div>
                                    <div className="relative transition-all duration-300">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pink-500 transition-colors" />
                                        <input
                                            value={formData.password}
                                            name="password"
                                            onChange={handleChange}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 border border-slate-100 focus:border-pink-200 focus:bg-white outline-none transition-all text-sm shadow-sm focus:shadow-pink-100/50"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 bottom-4 text-slate-300 hover:text-pink-500 transition-colors"
                                        >
                                            {showPassword ? <FaEyeSlash size={16} /> : <FiEye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading} // disable while loading
                                    className={`relative overflow-hidden w-full py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 group shadow-2xl
        ${loading ? "bg-pink-300 cursor-not-allowed" : "bg-slate-900 text-white hover:shadow-pink-200 shadow-slate-200"}`}
                                >
                                    {loading ? (
                                        // Loader animation
                                        <span className="flex items-center justify-center gap-2">
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />
                                            </svg>
                                            Logging in...
                                        </span>
                                    ) : (
                                        <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300">
                                            Login <FiArrowRight className="text-lg" />
                                        </span>
                                    )}
                                    {!loading && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    )}
                                </button>
                            </form>

                            {/* Minimal Divider */}
                            <div className="relative my-4 text-center">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                                <span className="relative px-4 bg-white/0 text-[9px] uppercase tracking-[0.3em] text-slate-300 font-bold">
                                    Authentication
                                </span>
                            </div>

                            {/* Social Options */}
                            {/* <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: FaGoogle, label: "Google" },
                                    { icon: FaFacebookF, label: "Facebook" }
                                ].map((social, i) => (
                                    <button key={i} className="flex items-center justify-center gap-3 border border-slate-100 py-3.5 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all group">
                                        <social.icon className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                        <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 group-hover:text-slate-900">
                                            {social.label}
                                        </span>
                                    </button>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    {/* Bottom Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center mt-4"
                    >
                        <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium">
                            New to the ritual?{" "}
                            <Link href="/register" className="text-slate-900 font-bold hover:text-pink-500 transition-colors underline underline-offset-4 decoration-pink-200">
                                Register
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}