"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPackage, FiTruck, FiMapPin, FiCreditCard, FiCopy, FiCheckCircle } from "react-icons/fi";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";

export default function OrderDrawer({ open, onClose, order, onStatusChange }) {
    const [currentStatus, setCurrentStatus] = useState(order?.orderStatus || "");

    useEffect(() => {
        setCurrentStatus(order?.orderStatus || "");
    }, [order]);

    const handleStatusChange = async (newStatus) => {
        const prevStatus = currentStatus;
        setCurrentStatus(newStatus); // optimistic UI

        try {
            await api.patch(`/orders/${order._id}/status`, { status: newStatus });
            toast.success(`Order marked as ${newStatus}`);
            if (onStatusChange) onStatusChange(order._id, newStatus); // notify parent
        } catch (err) {
            setCurrentStatus(prevStatus); // rollback on error
            toast.error( err.response.data.message || "Failed to update status");
        }
    };


    const copyToClipboard = (id) => {
        navigator.clipboard.writeText(id);
        toast.success("Order ID copied!");
    };

    const statusStyles = {
        pending: "bg-amber-50 text-amber-700 border-amber-100",
        processing: "bg-blue-50 text-blue-700 border-blue-100",
        shipped: "bg-indigo-50 text-indigo-700 border-indigo-100",
        delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
        cancelled: "bg-slate-50 text-slate-500 border-slate-100",
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 150 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-slate-50 z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 bg-white border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Order Details</h2>
                                <button
                                    onClick={() => copyToClipboard(order._id)}
                                    className="group flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 transition-colors"
                                >
                                    #{order._id} <FiCopy className="opacity-0 group-hover:opacity-100" />
                                </button>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* Status & Quick Actions */}
                            <section className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-slate-500">Current Status</span>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusStyles[currentStatus]}`}>
                                        {currentStatus}
                                    </div>
                                </div>
                                <select
                                    value={currentStatus}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
                                >
                                    <option value="pending">Mark as Pending</option>
                                    <option value="processing">Start Processing</option>
                                    <option value="shipped">Mark as Shipped</option>
                                    <option value="delivered">Mark as Delivered</option>
                                    <option value="cancelled">Cancel Order</option>
                                </select>
                            </section>

                            {/* Customer Profile */}
                            <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-200">
                                        {order.user?.name?.charAt(0) || "U"}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{order.user?.name || "Guest User"}</h3>
                                        <p className="text-sm text-slate-500">{order.user?.email}</p>
                                        <p className="text-sm text-slate-500 font-medium mt-0.5">{order.shippingAddress?.phone}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Order Items */}
                            <section>
                                <div className="flex items-center gap-2 mb-3 px-1">
                                    <FiPackage className="text-indigo-600" />
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Order Items</h3>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                                    {order.products.map((item) => (
                                        <div key={item._id} className="p-4 flex gap-4 hover:bg-slate-50 transition-colors">
                                            <img
                                                src={item.product?.images?.[0]?.url || "/images/placeholder.png"}
                                                className="w-16 h-16 rounded-xl object-cover border border-slate-100"
                                                alt="Product"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 truncate">
                                                    {item.product?.name || "Premium Product"}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Qty: <span className="text-slate-900 font-medium">{item.quantity}</span> × Rs. {item.price}
                                                </p>
                                            </div>
                                            <div className="text-sm font-bold text-slate-900">
                                                Rs. {item.price * item.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Logistics Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2 text-indigo-600">
                                        <FiMapPin size={16} />
                                        <span className="text-xs font-bold uppercase tracking-wider">Shipping</span>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        {order.shippingAddress?.address},<br />
                                        {order.shippingAddress?.city}, {order.shippingAddress?.state}
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2 text-indigo-600">
                                        <FiCreditCard size={16} />
                                        <span className="text-xs font-bold uppercase tracking-wider">Payment</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900 uppercase">
                                        {order.paymentMethod}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className={`h-2 w-2 rounded-full ${order.paymentStatus === 'completed' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                        <span className={`text-xs font-medium ${order.paymentStatus === 'completed' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                    {order.paymentStatus === "completed" && order.paidAt && (
                                        <p className="text-xs text-slate-500 mt-2">
                                            Paid at:{" "}
                                            <span className="font-medium text-slate-700">
                                                {new Date(order.paidAt).toLocaleString()}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer Summary */}
                        <div className="p-6 bg-white border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Subtotal</span>
                                    <span>Rs. {order.subtotal || order.totalAmount}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Shipping Fee</span>
                                    <span>Rs. {order.shipping || 0}</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                                    <span className="text-base font-bold text-slate-900">Total Amount</span>
                                    <span className="text-xl font-black text-indigo-600">Rs. {order.totalAmount}</span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
                            >
                                Close Details
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}