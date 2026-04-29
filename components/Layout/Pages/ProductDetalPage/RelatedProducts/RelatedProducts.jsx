"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/components/utils/Api/api";
import { useMyContext } from "@/components/utils/Context/Context";
import { PiHandbagLight, PiHeartFill, PiHeartLight, PiStarFill } from "react-icons/pi";
import Image from "next/image";

const RelatedProducts = ({ id }) => {

    const [related, setRelated] = useState()
    const { addToCart, toggleWishlist, wishList } = useMyContext()

    const fetchRelated = async () => {
        try {
            const { data } = await api.get(`/products/${id}/related`)
            setRelated(data.related)
        } catch (error) {
            console.log('fetch related error:', error)
        }
    }

    useEffect(() => {
        fetchRelated()
    }, [])

    if (!related) return null

    return (
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-stone-100">
            <div className="flex items-end justify-between mb-12">
                <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-600">Complete the ritual</span>
                    <h2 className="text-4xl font-serif text-slate-900 italic">You may also love</h2>
                </div>
                <Link href={`/shop`}>
                    <button className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-900 group">
                        View Collection <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {related.map((product, index) => {
                    const isWishlisted = wishList?.some(
                        (item) => item._id === product._id
                    );
                    return (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            {/* Image */}
                            <div className="relative aspect-square rounded-2xl sm:rounded-[32px] overflow-hidden bg-stone-100">

                                <Link href={`/product/${product.slug}`}>
                                    <Image
                                        src={product.images[0].url}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </Link>

                                {/* Wishlist Button */}
                                <button
                                    onClick={() => toggleWishlist(product._id)}
                                    className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition"
                                >
                                    {isWishlisted ? (
                                        <PiHeartFill size={18} className="text-rose-500" />
                                    ) : (
                                        <PiHeartLight size={18} className="text-stone-400" />
                                    )}
                                </button>

                                {/* Buttons */}
                                <div className="absolute bottom-2 left-2 right-2 sm:bottom-0 sm:p-4 
                                    flex gap-2 sm:block
                                    translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 
                                    transition-all duration-500">

                                    {/* Add to Cart */}
                                    <button
                                        onClick={() => addToCart(product._id)}
                                        className="flex-1 sm:w-full bg-stone-900 text-white py-2 sm:py-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest"
                                    >
                                        <PiHandbagLight size={16} />
                                        Add
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="mt-3 sm:mt-6 text-center px-1">
                                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-stone-400">
                                    {product.category}
                                </p>

                                <h3 className="text-sm sm:text-lg font-serif text-stone-800 leading-tight">
                                    {product.name}
                                </h3>

                                <div className="mt-1 sm:mt-2 flex items-center justify-center gap-2 sm:gap-4">
                                    <p className="text-sm sm:text-base font-medium text-stone-800">
                                        NPR. {product.price}
                                    </p>

                                    {product.oldPrice && product.oldPrice > product.price && (
                                        <p className="text-xs sm:text-sm text-stone-400 line-through">
                                            NPR. {product.oldPrice}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-1 text-[10px] text-pink-300">
                                        <PiStarFill />
                                        <span className="text-stone-400 text-[10px] sm:text-xs">
                                            ({product.rating})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    );
};

export default RelatedProducts;