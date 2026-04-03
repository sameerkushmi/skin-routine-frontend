"use client";

import { motion } from "framer-motion";

const ContactFormSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        const text = `Hello! I am ${name}.\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
        const encodedText = encodeURIComponent(text);

        const phoneNumber = process.env.NEXT_PUBLIC_NUMBER;

        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
    };

    return (
        <section className="relative py-12 sm:py-16 md:py-20 bg-[#FCFBF9] overflow-hidden">

            {/* Glow */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 h-72 md:w-96 md:h-96 bg-rose-50 rounded-full blur-2xl md:blur-3xl opacity-50" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mb-10 md:mb-16"
                >
                    <motion.span
                        variants={itemVariants}
                        className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-rose-400 uppercase mb-3 block"
                    >
                        Connect With Us
                    </motion.span>

                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl sm:text-3xl md:text-5xl font-light text-stone-900 mb-4 md:mb-6 tracking-tight"
                    >
                        Let’s start your <span className="italic font-serif">glow</span> journey.
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base md:text-lg text-stone-500 max-w-md mx-auto leading-relaxed"
                    >
                        Get personalized skincare guidance from our specialists.
                    </motion.p>
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-6 md:gap-y-8"
                >
                    {/* Name */}
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <label className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your name"
                            className="bg-transparent border-b border-stone-200 py-2.5 md:py-3 text-sm md:text-base text-stone-800 focus:outline-none focus:border-rose-300 placeholder:text-stone-300"
                            required
                        />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <label className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="your@email.com"
                            className="bg-transparent border-b border-stone-200 py-2.5 md:py-3 text-sm md:text-base text-stone-800 focus:outline-none focus:border-rose-300 placeholder:text-stone-300"
                            required
                        />
                    </motion.div>

                    {/* Subject */}
                    <motion.div variants={itemVariants} className="flex flex-col md:col-span-2">
                        <label className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
                            Subject
                        </label>
                        <select
                            id="subject"
                            className="bg-transparent border-b border-stone-200 py-2.5 md:py-3 text-sm md:text-base text-stone-800 focus:outline-none focus:border-rose-300 appearance-none"
                        >
                            <option>Skincare Consultation</option>
                            <option>Order Inquiry</option>
                            <option>Partnerships</option>
                            <option>General Feedback</option>
                        </select>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={itemVariants} className="flex flex-col md:col-span-2">
                        <label className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="3"
                            placeholder="Type your message..."
                            className="bg-transparent border-b border-stone-200 py-2.5 md:py-3 text-sm md:text-base text-stone-800 focus:outline-none focus:border-rose-300 resize-none placeholder:text-stone-300"
                            required
                        />
                    </motion.div>

                    {/* Button */}
                    <motion.div variants={itemVariants} className="md:col-span-2 pt-2 md:pt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 md:px-10 py-3 md:py-4 text-xs md:text-sm font-medium tracking-widest text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-all duration-300"
                        >
                            SEND VIA WHATSAPP
                        </button>
                    </motion.div>
                </motion.form>
            </div>
        </section>
    );
};

export default ContactFormSection;