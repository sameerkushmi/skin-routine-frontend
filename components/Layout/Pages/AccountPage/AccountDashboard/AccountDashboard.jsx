'use client'
import { useEffect, useState } from "react";
import { FiArrowRight, FiHeart, FiPackage, FiSettings, FiShoppingBag } from "react-icons/fi";
import AccountPage from "../AccountPage";
import { useMyContext } from "@/components/utils/Context/Context";
import Link from "next/link";
import api from "@/components/utils/Api/api";

const AccountDashboard = () => {

    const { user, cart, wishList } = useMyContext()
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchTotalOrders = async () => {
            try {
                const { data } = await api.get("/orders/my");
                setTotalOrders(data.totalOrders || 0);
            } catch (error) {
                console.error("Error fetching total orders:", error);
            }
        };

        fetchTotalOrders();
    }, []);


    const stats = [
        { title: "My Orders", value: totalOrders, sub: "Total Orders", icon: <FiPackage className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
        { title: "My Carts", value: cart.length || 0, sub: "Total Carts", icon: <FiShoppingBag className="w-5 h-5" />, color: "bg-rose-50 text-rose-600" },
        { title: "My Wishlist", value: wishList.length || 0, sub: "Saved Items", icon: <FiHeart className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
    ]

    return (
        <AccountPage>
            {/* Header Section */}
            <header className="mb-10">
                <h2 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">
                    Welcome back, <span className="text-pink-400 capitalize">{user?.name}</span>
                </h2>
                <p className="text-slate-500 mt-2 text-lg">Your beauty journey, curated and at your fingertips.</p>
            </header>

            {/* Stats: Soft Gradients & Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {stats.map((item) => (
                    <div key={item.title} className="group relative bg-white border border-slate-100 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-rose-100/50 hover:-translate-y-1">
                        <div className={`inline-flex p-3 rounded-2xl mb-4 ${item.color}`}>
                            {item.icon}
                        </div>
                        <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{item.title}</h4>
                        <div className="flex items-baseline gap-2 mt-2">
                            <p className="text-4xl font-bold text-slate-900">{item.value}</p>
                            <p className="text-slate-500 text-sm">{item.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Account Info - Modern Card */}
                <div className="lg:col-span-1 bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-xl font-semibold italic">Profile Details</h3>
                            <Link href="/account/settings">
                                <FiSettings className="w-5 h-5 text-slate-400 cursor-pointer hover:rotate-90 transition-transform" />
                            </Link>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Full Name</p>
                                <p className="text-lg font-medium">{user?.name}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Email Address</p>
                                <p className="text-lg font-medium">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Phone</p>
                                <p className="text-lg font-medium">{user?.phone || '97********'} </p>
                            </div>
                        </div>
                        <Link href="/account/profile" >
                            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 rounded-xl transition-colors">
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl" />
                </div>

                {/* Recent Orders - Clean List */}
                <div className="lg:col-span-2 bg-white border border-slate-100 p-8 rounded-[2rem]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-slate-900">Recent Orders</h3>
                        <button className="text-rose-600 text-sm font-medium flex items-center gap-1 hover:underline">
                            View All <FiArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {[
                            { id: "#1089", status: "Delivered", price: "$120.00", date: "Oct 12" },
                            { id: "#1075", status: "Shipped", price: "$89.50", date: "Oct 05" },
                            { id: "#1058", status: "Processing", price: "$45.75", date: "Sep 28" },
                        ].map((order) => (
                            <div key={order.id} className="py-4 flex items-center justify-between group cursor-pointer">
                                <div>
                                    <p className="font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">{order.id}</p>
                                    <p className="text-sm text-slate-400">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-slate-900">{order.price}</p>
                                    <span className={`text-[10px] uppercase tracking-widest font-bold ${order.status === 'Delivered' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AccountPage>
    );
};

export default AccountDashboard;