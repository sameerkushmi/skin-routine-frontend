"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiPlus,
  FiMinus,
  FiCheckCircle,
} from "react-icons/fi";
import Image from "next/image";
import { useMyContext } from "@/components/utils/Context/Context";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import isBlockedProduct from "@/components/utils/blockedProudcts";

const ProductDetails = ({ product }) => {
  const router = useRouter()
  const { toggleWishlist, addToCart, wishList, setCheckoutItems } = useMyContext()
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock === 0;
  const blocked = isBlockedProduct(product?.name);
  const isDisabled = isOutOfStock || blocked;

  const isWishlisted = wishList?.some(
    (item) => item._id === product._id
  );

  useEffect(() => {
    setSelectedImg(0);
  }, [product]);

  const handleBuyNow = (product) => {
    setCheckoutItems([{ ...product, quantity }]);
    router.push("/checkout");
  };

  const handleInquiry = () => {
    const phone = process.env.NEXT_PUBLIC_NUMBER; // replace with your WhatsApp number
    const message = `Hello! I am interested in the product: ${product.name} (NPR. ${product.price.toLocaleString()})`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="min-h-screen bg-[#FCFBFA] selection:bg-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* LEFT - IMAGES */}
          <div className="lg:col-span-6 space-y-4">

            {/* MAIN IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full aspect-[4/4] min-h-[300px] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-white shadow-sm "
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImg}
                  src={
                    product?.images?.[selectedImg]?.url ||
                    product?.images?.[0]?.url ||
                    "/images/placeholder.png"
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                  alt="Product"
                />
              </AnimatePresence>

              <button onClick={() => toggleWishlist(product._id)} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white/80 backdrop-blur-md rounded-full hover:text-rose-500 shadow">
                {
                  isWishlisted ? (
                    <FiHeart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-current" />
                  ) : (
                    <FiHeart className="w-4 h-4 sm:w-5 sm:h-5" />
                  )
                }
              </button>

              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  <span className="bg-white text-black text-xs sm:text-sm font-semibold px-4 py-2 rounded-full">
                    Out of Stock
                  </span>
                </div>
              )}
            </motion.div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar p-4">
              {product?.images?.slice(0, 6).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden"
                >
                  <Image
                    fill
                    src={img.url}
                    className="object-cover"
                    alt="thumb"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - DETAILS */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-10">

            {/* HEADER */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider text-rose-600 uppercase">
                <span className="px-2 py-1 bg-rose-50 rounded">
                  Best Seller
                </span>
                <span>• Skin Care</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* PRICE */}
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-medium">
                  {
                    isDisabled ?
                      ''
                      :
                      <>
                        NPR. {product.price}
                      </>
                  }
                </span>
                {
                  product.oldPrice &&
                  <span className="text-lg text-stone-400 line-through">
                    NPR. {product.oldPrice.toLocaleString()}
                  </span>
                }
              </div>
              <p className="text-stone-500 text-sm sm:text-base mt-2">
                {product.shortDescription}
              </p>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase">
                Quantity
              </span>
              <div className="flex items-center  rounded-full px-2 py-1">
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="p-2"
                >
                  <FiMinus />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* TAGS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* SKIN TYPE */}
              {
                product.skinType && product.skinType.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 mb-2 uppercase">
                      Suitable For
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {product.skinType.map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-stone-100 px-2 py-1 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              }


              {/* INGREDIENTS */}
              <div className={`${product.skinType && product.skinType.length > 0 ? "" : "sm:col-span-2"}`}>
                <h4 className="text-xs font-bold text-stone-400 mb-2 uppercase">
                  Ingredients
                </h4>
                <div className="flex flex-wrap gap-1">
                  {product.ingredients.map((i) => (
                    <span
                      key={i}
                      className="text-xs  px-2 py-1 rounded-full"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              {/* CONCERNS */}
              {product?.concerns?.length > 0 && (
                <div className="sm:col-span-2">
                  <h4 className="text-xs font-bold text-stone-400 mb-2 uppercase">
                    Concerns
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {product.concerns.map((c) => (
                      <span
                        key={c}
                        className="text-xs  px-2 py-1 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              {
                isDisabled ?
                  ''
                  :
                  <>
                    <motion.button
                      onClick={() => !isOutOfStock && handleBuyNow(product)}
                      disabled={isOutOfStock}
                      whileTap={{ scale: isOutOfStock ? 1 : 0.97 }}
                      className={`w-full py-3 rounded-full border font-medium transition 
                    ${isOutOfStock
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "hover:bg-black hover:text-white"}`}
                    >
                      {isOutOfStock ? "Out of Stock" : "⚡ Buy Now"}
                    </motion.button>
                  </>
              }

              {
                isDisabled ?
                "" :
                <motion.button
                  onClick={() => !isOutOfStock && addToCart(product._id)}
                  disabled={isOutOfStock}
                  whileTap={{ scale: isOutOfStock ? 1 : 0.97 }}
                  className={`w-full py-3 rounded-full flex items-center justify-center gap-2 transition
                   ${isOutOfStock
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-black text-white"}`}
                >
                  <FiShoppingBag />
                  {isOutOfStock ? "Unavailable" : "Add to Cart"}
                </motion.button>
              }

              {/* INQUIRY BUTTON */}
              <motion.button
                onClick={handleInquiry}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-full flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 transition"
              >
                <FaWhatsapp /> Inquiry
              </motion.button>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1">
                <FiTruck />
                Fast Delivery
              </div>
              <div className="flex flex-col items-center gap-1">
                <FiRotateCcw />
                Easy Returns
              </div>
              <div className="flex flex-col items-center gap-1">
                <FiShield />
                Organic
              </div>
            </div>

            {/* TRUST */}
            <div className="bg-stone-50 p-4 rounded-xl space-y-2 text-sm">
              <div className="flex gap-2 items-center">
                <FiCheckCircle className="text-green-600" />
                Dermatologically tested
              </div>
              <div className="flex gap-2 items-center">
                <FiCheckCircle className="text-green-600" />
                No harmful chemicals
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;