"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaBox,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";
import { useMyContext } from "@/components/utils/Context/Context";
import DesktopSidebar from "./DesktopSidebar/DesktopSidebar";
import NotLoggedIn from "@/components/NotLoggedIn/NotLoggedIn";
import MobileDrawer from "./MobileDrawer/MobileDrawer";
import Loader from "@/components/Shared/Loader/Loader";
import { useRouter } from "next/navigation";

export default function AccountPage({ children }) {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const { user, loading } = useMyContext()

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const menuItems = [
    { label: "Dashboard", href: "/account", icon: <FaHome /> },
    { label: "Profile", href: "/account/profile", icon: <FaUser /> },
    { label: "Orders", href: "/account/orders", icon: <FaBox /> },
    { label: "Cart", href: "/account/carts", icon: <FaShoppingCart /> },
    { label: "Wishlist", href: "/account/wishlist", icon: <FaHeart /> },
    { label: "Addresses", href: "/account/addresses", icon: <FaMapMarkerAlt /> },
    { label: "Settings", href: "/account/settings", icon: <FaCog /> },
  ];

  useEffect(() => {
    if (!loading) {
      if (user?.role === "admin") {
        router.replace("/");
      }
    }
  }, [user, loading, router]);

  if (loading) return <Loader />

  if (!user) return <NotLoggedIn />

  if (user?.role === 'admin') return null

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col md:flex-row">

      {/* Desktop Sidebar */}
      <DesktopSidebar desktopCollapsed={desktopCollapsed} setDesktopCollapsed={setDesktopCollapsed} menuItems={menuItems} />

      {/* MOBILE DRAWER */}
      <MobileDrawer open={open} setOpen={setOpen} menuItems={menuItems} />

      {/* Main Content */}
      <motion.main
        className="flex-1 p-4 sm:p-6 md:p-8 md:h-screen md:overflow-y-scroll"
        layout
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {children}
      </motion.main>

    </div>
  );
}
