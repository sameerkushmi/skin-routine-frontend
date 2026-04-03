import { motion, AnimatePresence } from "framer-motion";
import { PiCaretDownThin } from "react-icons/pi";
import { useState } from "react";
import Link from "next/link";

const DesktopMenu = ({ navItems }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <ul className="hidden lg:flex items-center gap-10">
      {navItems.map((item, index) => (
        <li
          key={index}
          className="relative"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <Link
            href={item.path || "#"}
            className="text-[13px] font-medium tracking-[0.1em] uppercase text-stone-600 hover:text-pink-400 transition-colors flex items-center gap-1"
          >
            {item.name}
            {item.submenu && <PiCaretDownThin className={`transition-transform duration-300 ${hovered === index ? "rotate-180" : ""}`} />}
          </Link>

          <AnimatePresence>
            {item.submenu && hovered === index && (
              <motion.ul
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white border border-rose-50 shadow-2xl shadow-pink-100/50 rounded-2xl py-6 px-8 w-56 grid gap-3 z-50"
              >
                {item.submenu.map((sub, i) => (
                  <li key={i}>
                    <Link
                      href={sub.path}
                      className="text-sm text-stone-500 hover:text-pink-400 transition-colors block">
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

export default DesktopMenu;