"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiShoppingBag, FiStar } from "react-icons/fi";
import Link from "next/link";
import EmptyProduct from "./EmptyProduct/EmptyProduct";
import ProductGridSkeleton from "@/components/Shared/Loader/ProductGridSkeleton/ProductGridSkeleton";
import { useMyContext } from "@/components/utils/Context/Context";
import { PiHeart, PiHeartFill } from "react-icons/pi";


export default function ProductGrid({ products, setSearch, setFilters }) {

    const { loading, addToCart, wishList, toggleWishlist } = useMyContext()

    if (loading) return <ProductGridSkeleton numberOfProducts={products.length || 10} />

    // ✅ EMPTY STATE
    if (!products || products.length === 0) {
        return (
            <EmptyProduct setSearch={setSearch} setFilters={setFilters} />
        );
    }

    return (
        <section className="bg-[#FAF9F6] p-6 rounded-xl">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-serif text-stone-900">The Essentials</h2>
                        <p className="text-stone-500 font-light">Dermatologist-tested formulas for every skin story.</p>
                    </div>
                    <div className="text-sm font-medium tracking-widest text-stone-400 uppercase">
                        Showing {products.length} Products
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {products.map((product) => {
                        const discount = product.oldPrice && Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
                        const isWishlisted = wishList?.some(
                            (item) => item._id === product._id
                        );
                        const isOutOfStock = product.stock === 0;

                        return (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm">
                                    {discount && (
                                        <span className="absolute top-4 left-4 z-10 bg-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase text-stone-900 shadow-sm">
                                            {discount}% Off
                                        </span>
                                    )}

                                    <button
                                        onClick={() => toggleWishlist(product._id)}
                                        className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-stone-900 hover:scale-110">
                                        {isWishlisted ? (
                                            <PiHeartFill size={18} className="text-rose-500" />
                                        ) : (
                                            <PiHeart size={18} className="text-rose-600 shaodow" />
                                        )}
                                    </button>

                                    <Link
                                        href={isOutOfStock ? "#" : `/product/${product.slug}`}
                                        onClick={(e) => isOutOfStock && e.preventDefault()}
                                    >
                                        <Image
                                            src={product.images[0].url}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </Link>

                                    {/* High-End Hover Overlay */}
                                    <div className={`absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ease-[0.16,1,0.3,1] 
                                            bg-gradient-to-t from-white/90 to-transparent backdrop-blur-[2px]
                                            ${isOutOfStock
                                            ? "translate-y-0"
                                            : "translate-y-full group-hover:translate-y-0"}`}
                                    >
                                        <button
                                            onClick={() => !isOutOfStock && addToCart(product._id)}
                                            disabled={isOutOfStock}
                                            className={`w-full rounded-xl py-3 text-xs font-bold uppercase tracking-[0.2em] 
                                            flex items-center justify-center gap-2 transition-colors
                                            ${isOutOfStock
                                                    ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                                                    : "bg-stone-900 text-white hover:bg-stone-800"}`}
                                        >
                                            <FiShoppingBag size={14} />
                                            {isOutOfStock ? "Sold Out" : "Quick Add"}
                                        </button>
                                    </div>
                                    {isOutOfStock && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                            <span className="bg-white text-black text-[10px] font-semibold px-3 py-1.5 rounded-full tracking-wide">
                                                Out of Stock
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Info Container */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                                                {product.category || "Skincare"}
                                            </span>
                                            <Link
                                                href={isOutOfStock ? "#" : `/product/${product.slug}`}
                                                onClick={(e) => isOutOfStock && e.preventDefault()}
                                            >
                                                <h3 className="text-sm font-medium text-stone-900 mt-1 group-hover:text-stone-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-semibold text-stone-900">
                                                {
                                                    product.name === 'ZinCera' || product.name === 'Brillora' ?
                                                        ''
                                                        :
                                                        <>
                                                            NRs. {product.price}
                                                        </>
                                                }
                                            </span>
                                            {product.oldPrice && (
                                                <span className="text-xs text-stone-400 line-through">NRs. {product.oldPrice}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subtle Rating & Tags */}
                                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                                        <div className="flex items-center gap-1 text-stone-900">
                                            <FiStar size={12} className="fill-stone-900" />
                                            <span className="text-[11px] font-bold">{(Math.random() * (4.5 - 4) + 4).toFixed(1)}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            {
                                                product.skinType && product.skinType.length > 0 &&
                                                <span className="text-[9px] uppercase tracking-tighter border border-stone-200 px-2 py-0.5 rounded-full text-stone-500">
                                                    {product.skinType[0]}
                                                </span>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}