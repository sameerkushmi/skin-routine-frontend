"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiArrowRight, FiPackage, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import AccountPage from "../../AccountPage";
import Image from "next/image";
import Link from "next/link";
import api from "@/components/utils/Api/api";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get("/orders/my");
                setOrders(data.orders);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <FiCheckCircle /> };
            case 'pending': return { color: 'text-amber-600', bg: 'bg-amber-50', icon: <FiClock /> };
            case 'cancelled': return { color: 'text-rose-600', bg: 'bg-rose-50', icon: <FiXCircle /> };
            default: return { color: 'text-slate-600', bg: 'bg-slate-50', icon: <FiPackage /> };
        }
    };

    return (
        <AccountPage>
            <section className="min-h-screen bg-[#fafaf9] py-12 sm:py-20 px-4 relative overflow-hidden">
                {/* Premium Gradient Backgrounds */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] -z-10" />

                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <header className="mb-16 text-center sm:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
                        >
                            <FiShoppingBag className="text-rose-400 w-3 h-3" />
                            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-500">
                                Purchase History
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-6xl font-serif text-slate-900 tracking-tight"
                        >
                            Your <span className="italic font-light text-rose-400/80">Collections</span>
                        </motion.h1>
                    </header>

                    {/* Orders List */}
                    <div className="space-y-8">
                        {loading ? (
                            <div className="flex justify-center py-20"><span className="animate-pulse text-slate-400 font-serif">Loading your story...</span></div>
                        ) : orders.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
                                <p className="text-slate-400 italic font-serif text-xl mb-6">Your wardrobe is waiting to be filled.</p>
                                <Link href="/shop" className="px-8 py-3 bg-slate-900 text-white text-xs tracking-widest uppercase hover:bg-rose-500 transition-colors duration-500">
                                    Browse the Shop
                                </Link>
                            </motion.div>
                        ) : (
                            <AnimatePresence>
                                {orders.map((order, idx) => {
                                    const status = getStatusStyles(order.orderStatus);
                                    return (
                                        <motion.div
                                            key={order._id}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700"
                                        >
                                            {/* Order Meta Header */}
                                            <div className="px-8 py-6 border-b border-slate-50 flex flex-wrap justify-between items-center gap-4 bg-slate-50/30">
                                                <div className="flex gap-6">
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-tighter text-slate-400 mb-1">Order Ref.</p>
                                                        <p className="font-mono text-sm font-medium text-slate-700 uppercase">#{order._id.slice(-8)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-tighter text-slate-400 mb-1">Date</p>
                                                        <p className="text-sm font-medium text-slate-700">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                    </div>
                                                </div>
                                                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${status.bg} ${status.color}`}>
                                                    {status.icon} {order.orderStatus}
                                                </div>
                                            </div>

                                            {/* Products List */}
                                            <div className="p-8 space-y-8">
                                                {order.products.map((item, pIdx) => (
                                                    <div key={pIdx} className="flex flex-col sm:flex-row gap-6 items-center">
                                                        <Link href={`/product/${item.product?.slug}`}>
                                                            <div className="relative w-28 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-700">
                                                                <Image
                                                                    src={item.product?.images[0]?.url || '/placeholder.png'}
                                                                    alt={item.product?.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        </Link>
                                                        <div className="flex-1 text-center sm:text-left">
                                                            <Link href={`/product/${item.product?.slug}`}>
                                                                <h3 className="font-serif text-xl text-slate-800 mb-1">{item.product?.name}</h3>
                                                            </Link>
                                                            <p className="text-xs text-slate-400 uppercase tracking-widest">Quantity: {item.quantity}</p>
                                                        </div>
                                                        <div className="text-lg font-serif text-slate-900">
                                                            ₹{item.price.toLocaleString()}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Order Footer */}
                                            <div className="px-8 py-6 bg-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4">
                                                <div className="text-white">
                                                    <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">Total Investment</span>
                                                    <span className="text-2xl font-serif italic">₹{order.totalAmount.toLocaleString()}</span>
                                                </div>
                                                <Link
                                                    href={`/account/orders/info?id=${order._id}`}
                                                    className="group/btn flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] hover:text-rose-300 transition-colors"
                                                >
                                                    View Journey
                                                    <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </section>
        </AccountPage>
    );
}