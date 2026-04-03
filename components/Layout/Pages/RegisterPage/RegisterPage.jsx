"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiEye, FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FaEyeSlash } from "react-icons/fa";
import api from "@/components/utils/Api/api"
import toast from "react-hot-toast";
import { useMyContext } from "@/components/utils/Context/Context";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
    const { loading, setLoading } = useMyContext()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })

    // Form is valid if all fields are filled and password strength is strong
    const isFormValid =
        formData.name &&
        formData.email &&
        formData.password &&
        formData.confirm &&
        passwordStrength.label === "Strong";

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password') evaluatePasswordStrength(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirm)
            return toast.error('Password Not Matched !')

        try {
            setLoading(true)
            const { data } = await api.post('/auth/register', formData)
            toast.success(data.message || 'Registration successful !')
            setFormData({
                name: '',
                email: '',
                password: '',
                confirm: ''
            })
            setTimeout(() => {
                router.push('/login')
            }, 1500)

        } catch (error) {
            console.log("register form error : ", error.response.data.message)
            toast.error(error.response.data.message || 'Something went wrong !')
        } finally {
            setLoading(false)
        }
    }
    const evaluatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        let label = '';
        let color = '';

        if (score <= 2) {
            label = 'Weak';
            color = 'bg-red-500';
        } else if (score === 3 || score === 4) {
            label = 'Medium';
            color = 'bg-yellow-400';
        } else if (score === 5) {
            label = 'Strong';
            color = 'bg-green-500';
        }

        setPasswordStrength({ score, label, color });
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden flex items-center justify-center px-4 py-12">

            {/* Soft Ambient Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-gradient-to-br from-pink-100/40 to-transparent blur-[140px] rounded-full" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] bg-gradient-to-tl from-slate-200/50 to-transparent blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-7xl z-10 grid lg:grid-cols-2 gap-12 xl:gap-24 items-center"
            >

                {/* LEFT SIDE - Editorial Layout */}
                <div className="hidden lg:flex flex-col justify-center ">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <span className="text-[10px] uppercase tracking-[0.4em] text-pink-500 font-bold mb-4 block">
                            The New Standard
                        </span>
                        <h1 className="text-6xl xl:text-7xl font-serif text-slate-900 leading-[1.1]">
                            Begin Your <br />
                            <span className="italic text-slate-400 font-light">Skin Ritual</span>
                        </h1>
                        <p className="mt-8 text-slate-500 text-lg leading-relaxed max-w-md font-light">
                            Experience a sanctuary of personalized care. Our formulations are
                            designed to harmonize with your unique skin journey.
                        </p>
                    </motion.div>
                </div>

                {/* RIGHT SIDE - Premium Form */}
                <div className="w-full max-w-[540px] mx-auto">

                    {/* Branding for Mobile */}
                    <div className="text-center mb-12 lg:hidden">
                        <h1 className="text-2xl font-serif text-slate-900 uppercase tracking-[0.3em]">
                            Skin<span className="italic font-light text-pink-500">Routine</span>
                        </h1>
                    </div>

                    <div className="relative bg-white/70 backdrop-blur-3xl shadow-[0_48px_100px_-24px_rgba(0,0,0,0.08)] rounded-[3rem] p-10 md:p-14 border border-white/60">

                        <div className="mb-10">
                            <h2 className="text-2xl font-serif text-slate-900">Create Account</h2>
                            <p className="text-slate-400 text-sm mt-2">Enter your details to start your journey.</p>
                        </div>

                        <form className="space-y-7" onSubmit={handleSubmit}>
                            {/* Input Styling Helper */}
                            <FormInput
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                label="Full Name"
                                icon={<FiUser />}
                                placeholder="Jane"
                            />

                            <FormInput
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                label="Email Address"
                                icon={<FiMail />}
                                placeholder="jane@studio.com"
                                type="email"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="relative col-span-2 md:col-span-1">
                                    <FormInput
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        label="Password"
                                        icon={<FiLock />}
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 bottom-4 text-slate-300 hover:text-pink-500 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                                <div className="relative col-span-2 md:col-span-1">
                                    <FormInput
                                        name="confirm"
                                        value={formData.confirm}
                                        onChange={handleChange}
                                        label="Confirm"
                                        placeholder="••••••••"
                                        type={showConfirm ? "text" : "password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 bottom-4 text-slate-300 hover:text-pink-500 transition-colors"
                                    >
                                        {showConfirm ? <FaEyeSlash size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                                {/* Password Strength Meter */}
                                {formData.password && (
                                    <div className="mt-2 col-span-2">
                                        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                                            <motion.div
                                                className={`h-2 rounded-full ${passwordStrength.color}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                            />
                                        </div>
                                        <motion.p
                                            key={passwordStrength.label} // ensures animation triggers on label change
                                            className="text-[10px] mt-1 font-semibold"
                                            initial={{ opacity: 0, y: -2 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                color: passwordStrength.color === 'bg-red-500' ? '#f87171' :
                                                    passwordStrength.color === 'bg-yellow-400' ? '#facc15' :
                                                        '#22c55e'
                                            }}
                                        >
                                            {passwordStrength.label}
                                        </motion.p>
                                    </div>
                                )}
                            </div>

                            {/* Terms */}
                            <label className="flex items-center gap-3 cursor-pointer group px-1">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="w-5 h-5 border-2 border-slate-400 rounded-md peer-checked:bg-slate-900 peer-checked:border-slate-900 transition-all flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                                </div>
                                <span className="text-[12px] text-slate-400 font-medium">
                                    Accept <Link href="/terms" className="text-slate-900 underline underline-offset-4 decoration-slate-200">Terms & Conditions</Link>
                                </span>
                            </label>

                            {/* Premium Button */}
                            <motion.button
                                whileHover={!loading && isFormValid ? { scale: 1.01, backgroundColor: "#000" } : {}}
                                whileTap={!loading && isFormValid ? { scale: 0.98 } : {}}
                                type="submit"
                                disabled={loading || !isFormValid}
                                className={`group relative w-full py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] transition-all overflow-hidden shadow-2xl shadow-slate-200 flex items-center justify-center gap-2
                                     ${!isFormValid || loading ? "bg-slate-700 cursor-not-allowed" : "bg-slate-900 text-white"}`}
                            >
                                {loading ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    <p className="text-center text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-10 font-semibold">
                        A returning member?{" "}
                        <Link href="/login" className="text-pink-500 hover:text-slate-900 transition-colors ml-1 border-b border-pink-200 pb-0.5">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

// Reusable Input Component for cleaner code
function FormInput({ name, value = '', onChange, label, icon, placeholder, type = "text" }) {
    return (
        <div className="space-y-2.5">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                {label}
            </label>
            <div className="relative group">
                {icon && (
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pink-400 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    required
                    onChange={onChange}
                    value={value}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full ${icon ? 'pl-12' : 'px-6'} pr-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-pink-50/50 focus:border-pink-200 transition-all text-sm text-slate-900 placeholder:text-slate-300`}
                />
            </div>
        </div>
    );
}