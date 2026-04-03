"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiClock, FiMessageCircle } from "react-icons/fi";

const ContactInfoSection = () => {
    const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "concierge@glow.com";
    const phoneNumber = process.env.NEXT_PUBLIC_NUMBER || "+1234567890";
    const workingHours = "Mon - Fri: 9 AM – 6 PM (GMT+5:45)";

    const cardVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    const contactItems = [
        {
            icon: <FiMail />,
            title: "Email Support",
            value: supportEmail,
            link: `mailto:${supportEmail}`,
            label: "Write to us"
        },
        {
            icon: <FiPhone />,
            title: "Call Us",
            value: phoneNumber,
            link: `tel:${phoneNumber}`,
            label: "Speak with us"
        },
        {
            icon: <FiMessageCircle />,
            title: "WhatsApp",
            value: "Live Chat Available",
            link: `https://wa.me/${phoneNumber}`,
            label: "Message us"
        },
        {
            icon: <FiClock />,
            title: "Working Hours",
            value: workingHours,
            link: null,
            label: "Availability"
        },
    ];

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-[#FCFBF9] border-t border-stone-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">

                    {contactItems.map((item, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            className="group flex flex-col"
                        >
                            {/* Icon */}
                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-rose-50 text-rose-400 text-lg md:text-xl mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110">
                                {item.icon}
                            </div>

                            {/* Label */}
                            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-stone-400 font-bold mb-1">
                                {item.label}
                            </span>

                            {/* Title */}
                            <h3 className="font-serif italic text-base md:text-lg text-stone-800 mb-1 md:mb-2">
                                {item.title}
                            </h3>

                            {/* Value */}
                            {item.link ? (
                                <a
                                    href={item.link}
                                    className="text-xs sm:text-sm text-stone-500 hover:text-rose-400 transition-all duration-300 leading-snug border-b border-transparent hover:border-rose-200 pb-0.5"
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-xs sm:text-sm text-stone-500 leading-snug">
                                    {item.value}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactInfoSection;