"use client";

import { useEffect, useState } from "react";
import { FiMenu, FiBell, FiChevronLeft } from "react-icons/fi";
import Sidebar from "./Sidebar/Sidebar";
import { useMyContext } from "../utils/Context/Context";
import { useRouter } from "next/navigation";
import Loader from "../Shared/Loader/Loader";

const AdminLayout = ({ children }) => {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, loading } = useMyContext()


    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace("/login");
            } else if (user.role !== "admin") {
                router.replace("/");
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (!user || user.role !== 'admin') return null

    return (
        <div className="flex min-h-screen bg-[#F8F7F6] selection:bg-rose-100">
            {/* SIDEBAR */}
            <Sidebar sidebarOpen={sidebarOpen} />

            {/* MAIN CONTENT WRAPPER */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "pl-[280px]" : "pl-[88px]"}`}>

                {/* TOP NAVBAR */}
                <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between border-b border-stone-100">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-50 text-slate-600 hover:bg-stone-100 transition-colors"
                        >
                            {sidebarOpen ? <FiChevronLeft /> : <FiMenu />}
                        </button>

                    </div>

                    <div className="flex items-center gap-5">
                        {/* <button className="relative w-10 h-10 flex items-center justify-center rounded-full text-stone-500 hover:bg-stone-50 transition-all">
                            <FiBell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button> */}

                        <div className="h-8 w-[1px] bg-stone-200 mx-2" />

                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900 leading-none capitalize">{user.name}</p>
                                <p className="text-[10px] text-stone-400 font-medium mt-1 uppercase tracking-tighter">Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-white shadow-sm overflow-hidden">
                                <img src={user.avatar.url || '/images/profile/default.jpg'} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="p-8  mx-auto w-full">
                    {/* Content Slot */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;