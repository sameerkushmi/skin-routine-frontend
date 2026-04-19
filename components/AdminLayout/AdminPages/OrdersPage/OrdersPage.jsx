"use client";

import { useEffect, useState } from "react";
import {
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiRefreshCw,
    FiPackage,
    FiClock
} from "react-icons/fi";
import AdminLayout from "../../AdminLayout";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";
import OrderDrawer from "./OrderDrawer/OrderDrawer";
import MobileCard from "./MobileCard/MobileCard";
import { BiMoney } from "react-icons/bi";

const OrdersPage = () => {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [totalRevenue, setTotalRevenue] = useState(0);

    const itemsPerPage = 10;

    const fetchOrders = async () => {
        try {
            const { data } = await api.get("/orders/get-all", {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    search,
                    status: statusFilter,
                    paymentMethod: paymentFilter,
                },
            });
            setOrders(data.orders);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            toast.error("Failed to fetch orders");
        }
    };

    const fetchTotalRevenue = async () => {
        try {
            const { data } = await api.get('/orders/total-revenue')
            setTotalRevenue(data.totalCompletedAmount || 0)
        } catch (error) {
            console.log("fetch total revenue error: ", error)
        }
    }

    useEffect(() => {
        fetchTotalRevenue();
        const delay = setTimeout(() => fetchOrders(), 400);
        return () => clearTimeout(delay);
    }, [currentPage, search, statusFilter, paymentFilter]);

    const getStatusStyles = (status) => {
        const styles = {
            delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
            cancelled: "bg-rose-50 text-rose-600 border-rose-100",
            processing: "bg-blue-50 text-blue-600 border-blue-100",
            shipped: "bg-indigo-50 text-indigo-600 border-indigo-100",
            pending: "bg-amber-50 text-amber-600 border-amber-100"
        };
        return styles[status?.toLowerCase()] || styles.pending;
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-slate-50/50 pb-20">
                {/* --- TOP NAVIGATION / HEADER --- */}
                <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
                    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-6">
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 md:gap-6">
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Order Management</h1>
                                <p className="text-xs md:text-sm text-slate-500 mt-1">Manage, track, and fulfill customer requests.</p>
                            </div>

                            {/* FILTERS */}
                            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                                <div className="relative group flex-grow sm:flex-grow-0">
                                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                                        className="pl-10 pr-4 py-2.5 w-full md:w-64 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none"
                                    />
                                </div>

                                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                                        className="bg-transparent flex-1 px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium text-slate-600 outline-none cursor-pointer"
                                    >
                                        <option value="">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    <div className="w-px h-4 bg-slate-200 mx-1" />
                                    <select
                                        value={paymentFilter}
                                        onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }}
                                        className="bg-transparent flex-1 px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium text-slate-600 outline-none cursor-pointer"
                                    >
                                        <option value="">Payment</option>
                                        <option value="cod">COD</option>
                                        <option value="esewa">eSewa</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => { setSearch(""); setStatusFilter(""); setPaymentFilter(""); setCurrentPage(1); }}
                                    className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center border border-slate-200 sm:border-none"
                                    title="Reset Filters"
                                >
                                    <FiRefreshCw size={18} />
                                    <span className="ml-2 sm:hidden text-sm font-medium">Reset Filters</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-6 md:mt-8">

                    {/* --- QUICK STATS --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                        {[
                            { label: "Pending Orders", val: orders.filter(o => o.orderStatus === 'pending').length, icon: FiClock, color: "text-amber-600", bg: "bg-amber-50" },
                            { label: "Fulfillment", val: orders.filter(o => o.orderStatus === 'delivered').length, icon: FiPackage, color: "text-indigo-600", bg: "bg-indigo-50" },
                            { label: "Est. Revenue", val: `NPR. ${totalRevenue.toLocaleString()}`, icon: BiMoney, color: "text-emerald-600", bg: "bg-emerald-50" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 flex items-center gap-4 md:gap-5 shadow-sm">
                                <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                                    <stat.icon size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs md:text-sm font-medium text-slate-500 truncate">{stat.label}</p>
                                    <p className="text-lg md:text-xl font-bold text-slate-900 truncate">{stat.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- TABLE / MOBILE LIST --- */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Customer Info</th>
                                        <th className="px-6 py-4">Amount & Payment</th>
                                        <th className="px-6 py-4">Progress</th>
                                        <th className="px-6 py-4 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {orders.map((order) => (
                                        <tr
                                            key={order._id}
                                            onClick={() => { setSelectedOrder(order); setDrawerOpen(true); }}
                                            className="group cursor-pointer hover:bg-slate-50/80 transition-all"
                                        >
                                            <td className="px-6 py-5">
                                                <span className="font-mono text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    #{order._id.slice(-8).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">
                                                        {order.user?.name?.charAt(0) || "G"}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-sm font-bold text-slate-800 truncate">{order.user?.name || "Guest User"}</div>
                                                        <div className="text-xs text-slate-500 font-medium truncate">{order.user?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm font-bold text-slate-900">NPR. {order.totalAmount.toLocaleString()}</div>
                                                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-tight">{order.paymentMethod}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 text-[11px] font-bold rounded-full border shadow-sm ${getStatusStyles(order.orderStatus)}`}>
                                                    {order.orderStatus.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-semibold text-slate-700">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                    <span className="text-[10px] text-slate-400">{new Date(order.createdAt).getFullYear()}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <MobileCard orders={orders} setSelectedOrder={setSelectedOrder} setDrawerOpen={setDrawerOpen} getStatusStyles={getStatusStyles} />

                        {/* EMPTY STATE */}
                        {orders.length === 0 && (
                            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                                <FiPackage size={48} className="mb-4 opacity-20" />
                                <p className="text-sm font-medium">No orders found matching your criteria</p>
                            </div>
                        )}
                    </div>

                    {/* --- PAGINATION --- */}
                    {totalPages > 1 && (
                        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4 px-2">
                            <p className="text-sm text-slate-500 font-medium order-2 md:order-1">
                                Showing page <span className="text-slate-900">{currentPage}</span> of <span className="text-slate-900">{totalPages}</span>
                            </p>
                            <div className="flex gap-1.5 order-1 md:order-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto justify-center">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shrink-0"
                                >
                                    <FiChevronLeft size={20} />
                                </button>

                                {/* Responsive Pagination logic: only show 3 buttons on small mobile */}
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all shrink-0 ${currentPage === i + 1 ? "bg-slate-900 text-white shadow-lg" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shrink-0"
                                >
                                    <FiChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* DRAWER */}
                <OrderDrawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    order={selectedOrder}
                    onStatusChange={(id, newStatus) => {
                        setOrders((prev) =>
                            prev.map((o) => o._id === id ? { ...o, orderStatus: newStatus } : o)
                        );
                    }}
                />
            </div>
        </AdminLayout>
    );
};

export default OrdersPage;