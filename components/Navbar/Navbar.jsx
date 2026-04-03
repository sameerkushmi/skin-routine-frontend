'use client';
import { useState, useEffect } from "react";
import { PiHandbagLight, PiUserLight, PiMagnifyingGlassLight } from "react-icons/pi";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { VscClose } from "react-icons/vsc";
import Link from "next/link";
import MobileMenu from "./MobileMenu/MobileMenu";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import { useMyContext } from "../utils/Context/Context";
import SearchModal from "./SearchModal/SearchModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, cart } = useMyContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    {
      name: "Brands",
      submenu: [
        { label: "Skin Routine", path: "/shop?brand=skin-routine" },
        { label: "Aminu", path: "/shop?brand=aminu" },
      ],
    },
    {
      name: "Categories",
      submenu: [
        { label: "Cleansers", path: "/shop?category=cleanser" },
        { label: "Creams", path: "/shop?category=cream" },
        { label: "Moisturizers", path: "/shop?category=moisturizer" },
        { label: "Sunscreen", path: "/shop?category=sunscreen" },
      ],
    },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-serif italic tracking-tight text-stone-800"
        >
          Skin
          <span className="font-sans not-italic font-light text-pink-400">
            Routine
          </span>
          <span className="text-xl font-serif italic tracking-tight text-stone-800">
            Glow
          </span>
          
        </Link>

        <DesktopMenu navItems={navItems} />

        <div className="flex items-center gap-5">
          <button
            className="text-stone-600 hover:text-pink-400 transition-colors"
            onClick={() => setSearchOpen(true)}
          >
            <PiMagnifyingGlassLight size={24} />
          </button>

          <div className="flex items-center gap-4 border-l border-stone-200 pl-5">
            <Link
              href={user?.role === "admin" ? "/admin/dashboard" : "/account"}
              className="text-stone-600 hover:text-pink-400 transition-colors"
            >
              <PiUserLight size={24} />
            </Link>

            {user?.role !== "admin" && (
              <Link
                href="/account/carts"
                className="relative text-stone-600 hover:text-pink-400 transition-colors"
              >
                <PiHandbagLight size={24} />
                <span className="absolute -top-1 -right-1 bg-pink-400 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart?.length || 0}
                </span>
              </Link>
            )}

            <button
              className="lg:hidden text-stone-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <VscClose size={26} /> : <HiOutlineMenuAlt4 size={26} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        menuOpen={menuOpen}
        navItems={navItems}
        closeMenu={() => setMenuOpen(false)}
      />

      <SearchModal searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    </nav>
  );
}