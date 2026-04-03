"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useMemo } from "react";

const offers = [
    {
        id: 1,
        title: "The Skincare Edit",
        desc: "Flat 10% Off on Cleansers & Moisturizers",
        img: "/images/homepage/offer-section/offer-1.png",
    },
    {
        id: 2,
        title: "Glow Essentials",
        desc: "flat ₹300 Off on creams & Face washes",
        img: "/images/homepage/offer-section/offer-2.jpg",
    },
    {
        id: 3,
        title: "Hydration Ritual",
        desc: "Flat ₹500 Off on Orders Above ₹1999",
        img: "/images/homepage/offer-section/offer-3.png",
    },
    {
        id: 4,
        title: "Derm Care Picks",
        desc: "Up to 30% Off on Dermatologist-Approved Brands",
        img: "/images/homepage/offer-section/offer-4.png",
    },
];

export default function PremiumOffers() {

    // ✅ Prevent re-creation
    const containerVariants = useMemo(() => ({
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.06,
            },
        },
    }), []);

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="py-12 px-4 md:py-20 md:px-10 lg:px-16 bg-[#FAF9F6]">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
                <div className="max-w-2xl">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-pink-400 font-bold">
                        Exclusive Deals
                    </span>

                    <h2 className="text-2xl md:text-5xl font-serif text-slate-900 mt-2 md:mt-3 leading-tight">
                        Elevate Your Beauty Ritual
                    </h2>
                </div>

                <p className="text-xs md:text-sm text-slate-500 max-w-xs leading-relaxed md:border-l md:border-slate-300 md:pl-6">
                    Discover curated luxury selections with exceptional offers.
                </p>
            </div>

            {/* GRID */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
                {offers.map((offer, idx) => (
                    <motion.div
                        key={offer.id}
                        variants={itemVariants}
                        transition={{ duration: 0.35 }}
                        className="group relative flex flex-col"
                    >
                        <Link href="/shop" className="block">

                            {/* IMAGE */}
                            <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-md bg-slate-200">

                                <Image
                                    src={offer.img}
                                    alt={offer.title}
                                    fill
                                    sizes="(max-width: 640px) 50vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                                    priority={idx < 1} // ✅ only first image priority
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                />
                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/25 transition-colors duration-300" />
                            </div>

                            {/* CONTENT */}
                            <div className="mt-3 md:mt-5 space-y-1">
                                <h3 className="text-sm md:text-lg font-serif text-slate-900 group-hover:text-pink-400 transition-colors">
                                    {offer.title}
                                </h3>

                                <p className="text-[11px] md:text-sm text-slate-500 font-light italic leading-snug line-clamp-2">
                                    {offer.desc}
                                </p>

                                {/* CTA */}
                                <div className="pt-1 overflow-hidden">
                                    <div className="flex items-center gap-1 text-[10px] md:text-xs font-bold uppercase group-hover:translate-x-1 transition-transform duration-200">
                                        Shop
                                        <FaArrowAltCircleRight size={12} className="text-pink-400" />
                                    </div>

                                    <div className="h-[1px] w-0 group-hover:w-16 bg-amber-800 transition-all duration-300 mt-1" />
                                </div>
                            </div>

                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}