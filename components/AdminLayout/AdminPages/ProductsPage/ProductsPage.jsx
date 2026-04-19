"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AdminLayout from "../../AdminLayout";
import Link from "next/link";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";
import DeleteConfirm from "@/components/Shared/DeleteConfirm/DeleteConfirm";
import MobileCard from "./MobileCard/MobileCard";

const ProductsPage = () => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products/get-all", {
                params: { page: currentPage, limit: itemsPerPage, search },
            });
            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, search]);

    const handleOpenConfirm = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        setDeleteLoading(true);
        try {
            await api.delete(`/products/${deleteId}`);
            toast.success("Product deleted");
            fetchProducts();
            setConfirmOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-[1200px] mx-auto space-y-6 py-6 px-3 sm:px-4">

                {/* HEADER */}
                <div className="bg-white/80 backdrop-blur-md border-b border-slate-100">
                    <div className="px-3 sm:px-4 py-4 flex flex-col gap-4 sm:gap-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
                            <div>
                                <span className="text-[9px] sm:text-xs font-bold tracking-[0.15em] text-[#9A0044] uppercase block mb-1">
                                    Inventory
                                </span>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-slate-900 leading-tight">
                                    Product Catalog
                                </h1>
                            </div>
                            <Link href="/admin/products/add" className="w-full sm:w-auto">
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-medium shadow hover:bg-[#9A0044] transition"
                                >
                                    <FiPlus size={16} />
                                    <span className="text-[13px] sm:text-sm">Add Product</span>
                                </motion.button>
                            </Link>
                        </div>

                        {/* SEARCH + FILTER */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <div className="relative w-full">
                                <FiSearch className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-8 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#9A0044]/20"
                                />
                            </div>
                            {/* <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition w-full sm:w-auto">
                                <FiFilter />
                                <span className="sm:hidden text-[12px]">Filter</span>
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden md:block bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-slate-400 text-[10px] uppercase tracking-[0.1em] font-bold">
                                <th className="text-left px-6 py-4">Product Details</th>
                                <th className="text-left px-6 py-4">Category</th>
                                <th className="text-left px-6 py-4">Price</th>
                                <th className="text-left px-6 py-4">Stock</th>
                                <th className="text-left px-6 py-4">Featured</th>
                                <th className="text-right px-6 py-4">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <AnimatePresence>
                                {products.map((product) => (
                                    <motion.tr
                                        key={product._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="group hover:bg-slate-50/50 transition-colors"
                                    >
                                        {/* Product Details */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="relative h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-xl">
                                                    <Link href={`/product/${product.slug}`}>
                                                        <img
                                                            src={product.images[0]?.url || "/images/placeholder.png"}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="flex flex-col">
                                                    <Link href={`/product/${product.slug}`} className="font-semibold text-slate-800 text-sm sm:text-base leading-tight">
                                                        {product.name}
                                                    </Link>
                                                    <span className="text-[10px] sm:text-xs text-slate-400 mt-1 line-clamp-2" style={{ maxWidth: "250px" }}>
                                                        {product.shortDescription}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-[10px] sm:text-sm text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded-lg">
                                                {product.category}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 flex flex-col gap-1">
                                            <span className="text-sm sm:text-base font-serif text-slate-900 italic">
                                                NPR. {product.price.toLocaleString()}
                                            </span>
                                            {product.oldPrice && (
                                                <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                                                    NPR. {product.oldPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <div
                                                        className={`h-1.5 w-1.5 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                                                    />
                                                    <span
                                                        className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}
                                                    >
                                                        {product.stock > 0 ? "Active" : "Depleted"}
                                                    </span>
                                                </div>
                                                <span className="text-[9px] sm:text-[11px] text-slate-400 ml-3">
                                                    {product.stock} units left
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {product.featured ? (
                                                <span className="text-[10px] sm:text-xs font-semibold text-white bg-[#9A0044] px-2 py-1 rounded-full">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                                    Regular
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-1 sm:gap-2 transition-opacity duration-300">
                                                <Link href={`/admin/products/edit/${product._id}`}>
                                                    <button
                                                        title="Edit"
                                                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                                    >
                                                        <FiEdit size={16} />
                                                    </button>
                                                </Link>
                                                <button
                                                    title="Delete"
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                    onClick={() => handleOpenConfirm(product._id)}
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-1 sm:gap-2 p-3 flex-wrap">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 sm:p-2.5 bg-slate-100 rounded disabled:opacity-50"
                            >
                                <FiChevronLeft size={16} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded ${currentPage === page ? "bg-[#9A0044] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 sm:p-2.5 bg-slate-100 rounded disabled:opacity-50"
                            >
                                <FiChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* MOBILE CARD */}
                <div className="md:hidden">
                    <MobileCard
                        products={products}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handleOpenConfirm={handleOpenConfirm}
                    />
                </div>

                {/* DELETE MODAL */}
                <DeleteConfirm
                    isOpen={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={handleConfirmDelete}
                    loading={deleteLoading}
                />
            </div>
        </AdminLayout>
    );
};

export default ProductsPage;