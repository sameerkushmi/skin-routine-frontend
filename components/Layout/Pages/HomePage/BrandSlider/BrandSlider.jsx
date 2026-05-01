"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const BRANDS = [
    {
        id: 1,
        title: "Radiant Essence",
        mobileImg: "/images/homepage/brand-banner/mobile/skin.jpg",
        desktopImg: "/images/homepage/brand-banner/desktop/skin.jpg",
        href: "/shop",
    },
    {
        id: 2,
        title: "Skin Care",
        mobileImg: "/images/homepage/brand-banner/mobile/skin-2.jpg",
        desktopImg: "/images/homepage/brand-banner/desktop/skin-2.png",
        href: "/shop",
    },
    {
        id: 3,
        title: "Skin Care 1",
        mobileImg: "/images/homepage/brand-banner/mobile/website-banner-1-mobile.png",
        desktopImg: "/images/homepage/brand-banner/desktop/website-banner-1.png",
        href: "/shop",
    },
    {
        id: 4,
        title: "Skin Care 2",
        mobileImg: "/images/homepage/brand-banner/mobile/website-banner-2-mobile.png",
        desktopImg: "/images/homepage/brand-banner/desktop/website-banner-2.png",
        href: "/shop",
    },
];

export default function BrandSlider() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [progress, setProgress] = useState(0);

    const slideDuration = 5000;

    const nextSlide = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % BRANDS.length);
        setProgress(0);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setIndex((prev) =>
            prev === 0 ? BRANDS.length - 1 : prev - 1
        );
        setProgress(0);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, slideDuration);

        const progressInterval = setInterval(() => {
            setProgress((prev) =>
                Math.min(prev + (100 / (slideDuration / 100)), 100)
            );
        }, 100);

        return () => {
            clearInterval(interval);
            clearInterval(progressInterval);
        };
    }, [nextSlide]);

    const variants = {
        initial: (direction) => ({
            y: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        animate: {
            y: "0%",
            opacity: 1,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        },
        exit: (direction) => ({
            y: direction > 0 ? "-50%" : "50%",
            opacity: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        }),
    };

    return (
        <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-neutral-950">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0"
                >
                    <Link href={BRANDS[index].href}>
                        <motion.div
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 6 }}
                            className="relative h-full w-full flex items-center justify-center"
                        >
                            <div className="relative w-full max-w-[1400px] h-full mx-auto">
                                <Image
                                    src={
                                        typeof window !== "undefined" &&
                                            window.innerWidth < 768
                                            ? BRANDS[index].mobileImg
                                            : BRANDS[index].desktopImg
                                    }
                                    alt={BRANDS[index].title}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 md:gap-8 z-30">
                <button
                    onClick={prevSlide}
                    className="p-2 md:p-3"
                >
                    <FaChevronUp className="w-4 h-4 md:w-6 md:h-6" />
                </button>

                {/* Progress Bars */}
                <div className="flex flex-col gap-2 md:gap-4">
                    {BRANDS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > index ? 1 : -1);
                                setIndex(i);
                                setProgress(0);
                            }}
                            className="relative w-1 h-8 md:h-12 bg-white/20 overflow-hidden"
                        >
                            {index === i && (
                                <motion.div
                                    className="absolute top-0 left-0 w-full bg-pink-500"
                                    style={{ height: `${progress}%` }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="p-2 md:p-3"
                >
                    <FaChevronDown className="w-4 h-4 md:w-6 md:h-6" />
                </button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 md:bottom-12 left-4 md:left-20 text-white/40 text-xs md:text-sm tracking-widest z-30">
                <span className="text-white">0{index + 1}</span> / 0
                {BRANDS.length}
            </div>
        </section>
    );
}