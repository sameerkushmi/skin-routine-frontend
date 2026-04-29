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
    const { loading, addToCart, wishList, toggleWishlist } = useMyContext();

    if (loading)
        return <ProductGridSkeleton numberOfProducts={products.length || 10} />;

    if (!products || products.length === 0) {
        return <EmptyProduct setSearch={setSearch} setFilters={setFilters} />;
    }

    return (
        <section className="bg-[#FAF9F6] p-6 rounded-xl">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-serif text-stone-900">
                            The Essentials
                        </h2>
                        <p className="text-stone-500 font-light">
                            Dermatologist-tested formulas for every skin story.
                        </p>
                    </div>

                    <div className="text-sm font-medium tracking-widest text-stone-400 uppercase">
                        Showing {products.length} Products
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {products.map((product) => {
                        const discount =
                            product.oldPrice &&
                            Math.round(
                                ((product.oldPrice - product.price) /
                                    product.oldPrice) *
                                100
                            );

                        const isWishlisted = wishList?.some(
                            (item) => item._id === product._id
                        );

                        const isOutOfStock = product.stock === 0;

                        const isDisabled = isOutOfStock

                        return (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* Image */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm">

                                    {discount && (
                                        <span className="absolute top-4 left-4 z-10 bg-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase text-stone-900 shadow-sm">
                                            {discount}% Off
                                        </span>
                                    )}

                                    {/* Wishlist */}
                                    <button
                                        onClick={() => toggleWishlist(product._id)}
                                        className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        {isWishlisted ? (
                                            <PiHeartFill size={18} className="text-rose-500" />
                                        ) : (
                                            <PiHeart size={18} className="text-rose-600" />
                                        )}
                                    </button>

                                    <Link
                                        href={`/product/${product.slug}`}
                                    >
                                        <Image
                                            src={
                                                product.images?.[0]?.url ||
                                                "/images/placeholder.png"
                                            }
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </Link>

                                    {/* Overlay */}
                                    <div
                                        className={`absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ease-[0.16,1,0.3,1]
                                        bg-gradient-to-t from-white/90 to-transparent backdrop-blur-[2px]
                                        ${isDisabled
                                                ? "translate-y-0"
                                                : "translate-y-full group-hover:translate-y-0"
                                            }`}
                                    >
                                        <button
                                            onClick={() => {
                                                if (isDisabled) return;
                                                addToCart(product._id);
                                            }}
                                            disabled={isDisabled}
                                            className={`w-full rounded-xl py-3 text-xs font-bold uppercase tracking-[0.2em]
                                            flex items-center justify-center gap-2 transition-colors
                                            ${isDisabled
                                                    ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                                                    : "bg-stone-900 text-white hover:bg-stone-800"
                                                }`}
                                        >
                                            <FiShoppingBag size={14} />
                                            {isOutOfStock
                                                ? "Sold Out"
                                                : "Quick Add"}
                                        </button>
                                    </div>

                                </div>

                                {/* Info */}
                                <div className="mt-6 space-y-2">
                                    <div className="space-y-2">
                                        <div className="flex items-cneter justify-between">
                                            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                                                {product.category || "Skincare"}
                                            </span>

                                        </div>
                                        <div>
                                            <Link
                                                href={
                                                    isDisabled
                                                        ? "#"
                                                        : `/product/${product.slug}`
                                                }
                                                onClick={(e) =>
                                                    isDisabled && e.preventDefault()
                                                }
                                            >
                                                <h3 className="text-sm font-medium text-stone-900 mt-1 group-hover:text-stone-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        </div>

                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-semibold text-stone-900">NPR. {product.price}</span>
                                        {product.oldPrice && product.oldPrice > product.price && (
                                            <span className="text-xs text-stone-400 line-through">NPR. {product.oldPrice}</span>
                                        )}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                                        <div className="flex gap-2">
                                            {product.skinType?.length > 0 && (
                                                <span className="text-[9px] uppercase tracking-tighter border border-stone-200 px-2 py-0.5 rounded-full text-stone-500">
                                                    {product.skinType[0]}
                                                </span>
                                            )}
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