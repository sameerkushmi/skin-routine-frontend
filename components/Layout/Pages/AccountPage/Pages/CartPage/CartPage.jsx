"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMinus,
    FiPlus,
    FiX,
    FiArrowRight,
    FiShoppingBag,
    FiTrash2
} from "react-icons/fi";
import Link from "next/link";
import AccountPage from "../../AccountPage";
import { useMyContext } from "@/components/utils/Context/Context";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter()
    const { cart, updateCart, removeFromCart, clearCart, setCheckoutItems, fetchCart } = useMyContext();

    const updateQuantity = (id, type, currentQty) => {
        if (type === "dec" && currentQty === 1) {
            // 🔥 REMOVE ITEM
            removeFromCart(id);
            return;
        }

        const newQty =
            type === "inc"
                ? currentQty + 1
                : currentQty - 1;

        updateCart(id, newQty);
    };

    const removeItem = (id) => {
        removeFromCart(id);
    };

    const subtotal = cart?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ) || 0;

    const total = subtotal + 100

    const handleCheckout = () => {
        setCheckoutItems(cart)
        router.push('/checkout')
    }

    useEffect(() => {
        const initCart = async () => {
            try {
                await fetchCart();
            } catch (error) {
                console.log("line no. 28 - fetch cart error :", error);
            }
        };

        initCart();
    }, []);

    return (
        <AccountPage>
            <section className="min-h-screen bg-[#FFF9FA] py-16 sm:py-24 px-4 sm:px-6 relative overflow-visible">
                {/* Background */}
                <div className="absolute top-[-10%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-white rounded-full blur-[120px] opacity-80" />
                <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-100/40 rounded-full blur-[100px]" />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* HEADER */}
                    <div className="flex flex-col items-center mb-12 sm:mb-20">
                        <div className="flex items-center gap-2 mb-3">
                            <FiShoppingBag className="text-pink-300" />
                            <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-bold text-stone-400">
                                Your Selection
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-stone-900 tracking-tight text-center">
                            Shopping <span className="text-pink-300 italic">Bag</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
                        {/* LEFT */}
                        <div className="lg:col-span-7">
                            {cart.length > 0 && (
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={clearCart}
                                        className="flex items-center gap-2 text-xs text-red-400 hover:text-red-600 transition"
                                    >
                                        <FiTrash2 size={14} />
                                        Clear Cart
                                    </button>
                                </div>
                            )}

                            <AnimatePresence mode="popLayout">
                                {cart.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                        className="flex gap-4 sm:gap-6 pb-6 sm:pb-10 mb-6 sm:mb-10 border-b border-pink-100/50"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative w-20 h-24 sm:w-32 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                                            <Link href={`/product/${item.slug}`}>
                                                <Image
                                                    fill
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="object-cover"
                                                />
                                            </Link>
                                        </div>

                                        {/* DETAILS */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h2 className="text-lg sm:text-2xl font-serif text-stone-900 leading-tight">
                                                        {item.name}
                                                        <span className="block text-pink-300 italic text-sm sm:text-lg">
                                                            {item.suffix}
                                                        </span>
                                                    </h2>

                                                    <p className="text-stone-400 text-[10px] sm:text-sm mt-1 tracking-widest">
                                                        ₹{item.price}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="p-1 sm:p-2 text-stone-300 hover:text-pink-400"
                                                >
                                                    <FiX size={16} />
                                                </button>
                                            </div>

                                            {/* COUNTER */}
                                            <div className="flex items-center justify-between mt-3 sm:mt-4">
                                                <div className="flex items-center border rounded-full p-1 bg-white">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, "dec", item.quantity)}
                                                        className="w-7 h-7 flex items-center justify-center"
                                                    >
                                                        <FiMinus size={12} />
                                                    </button>

                                                    <span className="w-6 text-center text-sm">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQuantity(item._id, "inc", item.quantity)}
                                                        className="w-7 h-7 flex items-center justify-center"
                                                    >
                                                        <FiPlus size={12} />
                                                    </button>
                                                </div>

                                                <span className="text-base sm:text-lg font-serif">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {cart.length === 0 && (
                                <div className="text-center py-16">
                                    <p className="text-stone-400 italic text-lg">
                                        Your bag is empty
                                    </p>
                                    <Link
                                        href="/shop"
                                        className="mt-4 inline-block text-xs tracking-[0.3em] uppercase border-b"
                                    >
                                        Return to Shop
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* RIGHT (FIXED STICKY) */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24 h-fit">
                                <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-xl border border-white/40">
                                    <h3 className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-6">
                                        Summary
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span>₹{subtotal.toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span>Shipping</span>
                                            <span className="text-pink-400 text-xs">
                                                100
                                            </span>
                                        </div>

                                        <div className="flex justify-between pt-4 border-t text-lg font-serif">
                                            <span>Total</span>
                                            <span>₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full mt-6 sm:mt-10 flex items-center justify-center gap-2 py-3 sm:py-5 bg-stone-900 text-white rounded-full text-xs tracking-widest uppercase hover:bg-black transition"
                                    >
                                        Checkout
                                        <FiArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AccountPage>
    );
}