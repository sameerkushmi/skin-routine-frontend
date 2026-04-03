"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    PiHeartLight,
    PiHandbagLight,
    PiHeartFill,
} from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import api from "@/components/utils/Api/api";
import { useMyContext } from "@/components/utils/Context/Context";
import ProductGridSkeleton from "@/components/Shared/Loader/ProductGridSkeleton/ProductGridSkeleton";

// 🔥 Framer Motion container & item animations
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, toggleWishlist, wishList } = useMyContext();

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const { data } = await api.get("/products/get-featured");
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching featured products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProducts();
    }, []);

    return (
        <section className="bg-[#FFF8F9] py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[9px] sm:text-[10px] tracking-[0.3em] font-bold uppercase text-pink-400/80 block mb-2">
                            Customer Favorites
                        </span>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-stone-800">
                            The <span className="italic font-light text-pink-300">Trending</span> Edit
                        </h2>
                    </motion.div>
                    <Link
                        href="/shop"
                        className="text-xs sm:text-sm text-stone-400 hover:text-pink-400 border-b pb-1"
                    >
                        Browse All Products
                    </Link>
                </div>

                {/* Product Grid */}
                {
                    loading ? <ProductGridSkeleton numberOfProducts={8} />
                        :
                        (
                            <motion.div
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
                            >
                                {products.map((product) => {
                                    const isWishlisted = wishList?.some((item) => item._id === product._id);
                                    const isOutOfStock = product.stock === 0;

                                    return (
                                        <motion.article
                                            key={product._id}
                                            variants={item}
                                            itemScope
                                            itemType="https://schema.org/Product"
                                            className="group relative will-change-transform"
                                        >
                                            {/* Product Image */}
                                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100">
                                                <Link
                                                    href={isOutOfStock ? "#" : `/product/${product.slug}`}
                                                    onClick={(e) => isOutOfStock && e.preventDefault()}
                                                    itemProp="url" aria-label={product.name}
                                                >
                                                    <Image
                                                        src={product?.images?.[0]?.url || "/images/placeholder.png"}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
                                                        priority
                                                    />
                                                </Link>

                                                {/* Wishlist */}
                                                <button
                                                    onClick={() => toggleWishlist(product._id)}
                                                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                                    className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition"
                                                >
                                                    {isWishlisted ? (
                                                        <PiHeartFill size={18} className="text-rose-500" />
                                                    ) : (
                                                        <PiHeartLight size={18} className="text-stone-400" />
                                                    )}
                                                </button>

                                                {/* Add to Cart */}
                                                <div className="absolute bottom-2 left-2 right-2 sm:bottom-0 sm:p-4 flex gap-2 sm:block translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-all duration-500">
                                                    <button
                                                        onClick={() => !isOutOfStock && addToCart(product._id)}
                                                        disabled={isOutOfStock}
                                                        aria-label="Add to cart"
                                                        className={`flex-1 sm:w-full py-2 sm:py-4 rounded-xl sm:rounded-2xl 
                                                        flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest transition
                                                        ${isOutOfStock
                                                                ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                                                                : "bg-stone-900 text-white"}`}
                                                    >
                                                        <PiHandbagLight size={16} />
                                                        {isOutOfStock ? "Sold Out" : "Add"}
                                                    </button>
                                                </div>
                                                {isOutOfStock && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                                        <span className="bg-white text-black text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full">
                                                            Out of Stock
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="mt-3 sm:mt-6 text-center px-1">
                                                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-stone-400" itemProp="category">
                                                    {product.category}
                                                </p>
                                                <h3 className="text-sm sm:text-lg font-serif text-stone-800 leading-tight" itemProp="name">
                                                    {product.name}
                                                </h3>
                                                <div className="mt-1 sm:mt-2 flex items-center justify-center gap-2 sm:gap-4">
                                                    <p className="text-sm sm:text-base text-stone-500 font-medium" itemProp="price">
                                                        ₹{product.price}
                                                    </p>
                                                </div>
                                            </div>

                                        </motion.article>
                                    );
                                })}
                            </motion.div>
                        )
                }
            </div>

            {/* Structured Data JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "ItemList",
                        itemListElement: products.map((p, i) => ({
                            "@type": "Product",
                            position: i + 1,
                            name: p.name,
                            image: p.images?.[0]?.url,
                            url: `/product/${p.slug}`,
                            price: p.price,
                            category: p.category,
                            aggregateRating: {
                                "@type": "AggregateRating",
                                ratingValue: p.rating,
                                reviewCount: p.numReviews || 0,
                            },
                        })),
                    }),
                }}
            />
        </section>
    );
}