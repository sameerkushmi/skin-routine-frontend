import { useMyContext } from "@/components/utils/Context/Context";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FiLogOut, FiHome,
    FiUsers, FiBox, FiShoppingCart, FiSettings,
    FiMail,
    FiBookOpen,
} from "react-icons/fi";

const Sidebar = ({ sidebarOpen }) => {

    const pathname = usePathname()
    const { logout } = useMyContext()

    const menuItems = [
        { name: "Dashboard", icon: <FiHome />, path: '/admin/dashboard' },
        { name: "Users", icon: <FiUsers />, path: '/admin/users' },
        { name: "Products", icon: <FiBox />, path: '/admin/products' },
        { name: "Orders", icon: <FiShoppingCart />, path: '/admin/orders' },
        { name: "Blogs", icon: <FiBookOpen />, path: '/admin/blogs' },
        { name: "Subscribers", icon: <FiMail />, path: '/admin/subscribers' },
        { name: "Settings", icon: <FiSettings />, path: '/admin/settings' },
    ];


    return (
        <motion.aside
            animate={{ width: sidebarOpen ? 280 : 88 }}
            className="fixed inset-y-0 left-0 z-50 bg-white border-r border-stone-200 flex flex-col transition-all ease-in-out"
        >
            {/* LOGO AREA */}
            <div className="h-20 flex items-center px-6 mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-serif italic text-xl">
                        S
                    </div>
                    {sidebarOpen && (
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="font-serif italic text-xl text-slate-900 whitespace-nowrap"
                        >
                            Skin<span className="font-sans not-italic font-light text-rose-500 text-base ml-0.5">Admin</span>
                        </motion.span>
                    )}
                </div>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item, i) => {
                    return (
                        <Link key={i} href={item.path}>
                            <button
                                className={`w-full cursor-pointer flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-200 group relative ${pathname === item.path ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "text-stone-500 hover:bg-stone-50"
                                    }`}
                            >
                                <span className={`text-xl ${pathname === item.path ? "text-rose-400" : "group-hover:text-slate-900"}`}>
                                    {item.icon}
                                </span>
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-sm font-medium tracking-tight"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                                {pathname === item.path && !sidebarOpen && (
                                    <div className="absolute left-0 w-1 h-6 bg-rose-500 rounded-r-full" />
                                )}
                            </button>
                        </Link>
                    );
                })}
            </nav>

            {/* LOGOUT AT BOTTOM */}
            <div className="p-4 border-t border-stone-100">
                <button onClick={logout} className="w-full flex items-center gap-4 p-3.5 text-stone-400 hover:text-rose-600 transition-colors">
                    <FiLogOut className="text-xl" />
                    {sidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    )
}

export default Sidebar