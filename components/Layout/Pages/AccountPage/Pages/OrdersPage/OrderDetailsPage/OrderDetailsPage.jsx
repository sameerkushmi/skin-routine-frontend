"use client";

import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiCheckCircle,
    FiClock,
    FiTruck,
    FiPackage,
    FiMapPin,
    FiCreditCard,
    FiHash
} from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountPage from "../../../AccountPage";
import api from "@/components/utils/Api/api";

export default function OrderDetailsPage({ id }) {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/single/${id}`);
                setOrder(data.order);
            } catch (err) {
                console.error(err);
            }
        };
        if (id) fetchOrder();
    }, [id]);

    const steps = ["pending", "processing", "shipped", "delivered"];
    const currentStepIndex = steps.indexOf(order?.orderStatus?.toLowerCase());

    if (!order) {
        return (
            <AccountPage>
                <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-400 rounded-full animate-spin" />
                    <span className="text-slate-400 font-serif italic tracking-wide">Retrieving your order details...</span>
                </div>
            </AccountPage>
        );
    }

    return (
        <AccountPage>
            <section className="min-h-screen bg-[#fafaf9] py-12 px-4 sm:px-8 relative overflow-hidden">
                {/* Refined Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-50/50 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-slate-100/50 rounded-full blur-[100px] -z-10" />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* NAV & HEADER */}
                    <div className="mb-12">
                        <Link
                            href="/account/orders"
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-rose-500 transition-colors mb-6"
                        >
                            <FiArrowLeft className="text-base" /> Back to History
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-serif text-slate-900 leading-tight">
                                    Order <span className="italic text-rose-400/80">Details</span>
                                </h1>
                                <p className="text-sm text-slate-400 mt-2 font-mono uppercase tracking-tighter">
                                    Reference ID: {order._id}
                                </p>
                            </div>
                            <div className="flex flex-col items-start md:items-end">
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">Placed On</span>
                                <time className="text-lg font-medium text-slate-800">
                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </time>
                            </div>
                        </div>
                    </div>

                    {/* STATUS STEPPER - THE PREMIUM TOUCH */}
                    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 mb-10 shadow-sm">
                        <div className="flex justify-between items-center relative max-w-4xl mx-auto">
                            {steps.map((step, idx) => (
                                <div key={step} className="flex flex-col items-center z-10 flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${idx <= currentStepIndex ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-300 border border-slate-100'
                                        }`}>
                                        {idx === 0 && <FiClock size={18} />}
                                        {idx === 1 && <FiPackage size={18} />}
                                        {idx === 2 && <FiTruck size={18} />}
                                        {idx === 3 && <FiCheckCircle size={18} />}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest mt-3 font-bold ${idx <= currentStepIndex ? 'text-slate-900' : 'text-slate-300'
                                        }`}>
                                        {step}
                                    </span>
                                </div>
                            ))}
                            {/* Connector Line */}
                            <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-50 -z-0" />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                className="absolute top-5 left-0 h-[2px] bg-slate-900 -z-0 transition-all duration-1000"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* LEFT COLUMN: PRODUCTS */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                                    <FiPackage /> Items in Package
                                </h2>
                                <div className="divide-y divide-slate-50">
                                    {order.products.map((item) => (
                                        <div key={item._id} className="py-6 first:pt-0 last:pb-0 flex gap-6">
                                            <Link href={`/product/${item.product.slug}`}>
                                                <div className="relative w-24 h-32 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100 shadow-inner">
                                                    <Image
                                                        src={item.product.images[0]?.url}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </Link>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <Link href={`/product/${item.product.slug}`}>
                                                            <h3 className="font-serif text-xl text-slate-800">{item.product.name}</h3>
                                                        </Link>
                                                        <p className="text-xs text-slate-400 mt-1 tracking-widest uppercase">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-medium text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SHIPPING & PAYMENT INFO */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                        <FiMapPin /> Delivery To
                                    </h3>
                                    <div className="space-y-1">
                                        <p className="font-serif text-lg text-slate-800 mb-2">{order.shippingAddress.address}</p>
                                        <p className="text-sm text-slate-500">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                                        <p className="text-sm text-slate-500 uppercase tracking-tighter">{order.shippingAddress.country}</p>
                                        <p className="text-sm text-slate-900 mt-4 font-medium italic">Contact: {order.shippingAddress.phone}</p>
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                        <FiCreditCard /> Payment Status
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] uppercase text-slate-400 tracking-widest">Method</p>
                                            <p className="text-sm font-medium text-slate-800 capitalize">{order.paymentMethod}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase text-slate-400 tracking-widest">Status</p>
                                            <p className={`text-sm font-bold uppercase ${order.paymentStatus === 'paid' ? 'text-emerald-500' : 'text-rose-400'}`}>
                                                {order.paymentStatus}
                                            </p>
                                        </div>
                                        {order.transactionId && (
                                            <div className="pt-2 border-t border-slate-50 flex items-center gap-2 text-slate-400">
                                                <FiHash size={12} />
                                                <span className="text-[10px] font-mono break-all leading-tight">{order.transactionId}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: SUMMARY */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-900 text-white rounded-[2rem] p-8 sticky top-8 shadow-2xl shadow-slate-200">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Financial Summary</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Subtotal</span>
                                        <span className="font-medium tracking-wide font-mono">₹{(order.totalAmount - 100).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Shipping</span>
                                        <span className="font-medium tracking-wide font-mono">₹100.00</span>
                                    </div>
                                    <div className="pt-6 border-t border-slate-800 flex justify-between items-baseline">
                                        <span className="text-sm font-medium">Grand Total</span>
                                        <div className="text-right">
                                            <span className="text-3xl font-serif italic text-rose-300 block leading-none">₹{order.totalAmount.toLocaleString()}</span>
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">VAT Included</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AccountPage>
    );
}