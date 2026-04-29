'use client';

import Link from "next/link";
import Image from "next/image";
import { FiTrash2, FiShoppingBag, FiArrowRight, FiPlus } from "react-icons/fi";
import AccountPage from "../../AccountPage";
import { useMyContext } from "@/components/utils/Context/Context";
import { useEffect } from "react";

export default function WishListPage() {
    const {
        wishList,
        addToCart,
        handleRemove,
        clearWishlist,
        fetchWishlist
    } = useMyContext();

    useEffect(() => {
        const initWishlist = async () => {
            try {
                await fetchWishlist();
            } catch (error) {
                console.log("fetch wishlist error:", error);
            }
        };

        initWishlist();
    }, []);

    // EMPTY STATE
    if (wishList.length === 0) return (
        <AccountPage>
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
                <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center animate-pulse">
                        <FiShoppingBag className="text-gray-200 text-4xl" />
                    </div>
                </div>

                <h2 className="text-3xl font-serif text-gray-900 mb-3 tracking-tight">
                    Your wishlist is a blank canvas.
                </h2>

                <p className="text-gray-500 mb-10 max-w-sm leading-relaxed">
                    Browse our latest arrivals and save the pieces that speak to your style.
                </p>

                <Link
                    href="/shop"
                    className="group flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full hover:bg-neutral-800 transition-all duration-500"
                >
                    <span className="text-sm font-medium tracking-wide">
                        EXPLORE COLLECTION
                    </span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </AccountPage>
    );

    return (
        <AccountPage>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">

                {/* HEADER */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                            Your Selection
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-gray-950 tracking-tighter">
                            Wishlist
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-500 font-medium italic">
                            {wishList.length} {wishList.length === 1 ? "Piece" : "Pieces"} Saved
                        </p>

                        <button
                            onClick={clearWishlist}
                            className="bg-red-500 text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-1"
                        >
                            <FiTrash2 size={14} /> Clear All
                        </button>
                    </div>
                </header>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">

                    {wishList.map((product) => {

                        return (
                            <div key={product._id} className="group relative flex flex-col">

                                {/* IMAGE */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9] rounded-[20px]">

                                    <Link
                                        href={`/product/${product.slug}`}
                                    >
                                        <Image
                                            fill
                                            src={product.images?.[0]?.url}
                                            alt={product.name}
                                            className="h-full w-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                        />
                                    </Link>

                                    {/* REMOVE */}
                                    <button
                                        onClick={() => handleRemove(product._id)}
                                        className="absolute top-4 right-4 z-20 p-3 bg-white/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                        title="Remove"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>

                                    {/* QUICK ADD */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">

                                        <button
                                            className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition
                                            ${product.stock === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-black text-white hover:bg-neutral-800"}
                                            `}
                                            onClick={() => {
                                                if (product.stock === 0) return;
                                                addToCart(product);
                                            }}
                                            disabled={product.stock === 0 }
                                        >
                                            <FiPlus />
                                            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                        </button>
                                    </div>
                                </div>

                                {/* INFO */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between items-start">

                                        <div className="max-w-[70%]">
                                            <h3 className="text-sm font-semibold text-gray-900 group-hover:underline">
                                                <Link
                                                    href={`/product/${product.slug}`}
                                                    onClick={(e) => isDisabled && e.preventDefault()}
                                                >
                                                    {product.name}
                                                </Link>
                                            </h3>

                                            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mt-1.5">
                                                {product.category || "Limited Edition"}
                                            </p>
                                        </div>

                                        {/* <p className="text-sm font-serif font-medium text-gray-950">
                                            {`NRs. ${product.price.toLocaleString()}`}
                                        </p> */}
                                        <p className="text-sm font-serif font-medium text-gray-950">
                                            NPR. {product.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AccountPage>
    );
}