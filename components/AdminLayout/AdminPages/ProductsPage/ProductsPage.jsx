"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AdminLayout from "../../AdminLayout";
import Link from "next/link";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";
import DeleteConfirm from "@/components/Shared/DeleteConfirm/DeleteConfirm";

const ProductsPage = () => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    // Fetch products from backend
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

    // Open confirm modal
    const handleOpenConfirm = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    // Confirm deletion
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
            <div className="max-w-[1200px] mx-auto space-y-10 py-8 px-4">

                {/* HEADER */}
                <div className="bg-white/80 backdrop-blur-md border-b border-slate-100">
                    <div className="max-w-[1200px] mx-auto px-4 py-4 md:py-6 flex flex-col gap-4 md:gap-6">

                        {/* TOP ROW */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#9A0044] uppercase block mb-1">
                                    Inventory
                                </span>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
                                    Product Catalog
                                </h1>
                            </div>

                            <Link href="/admin/products/add" className="w-full sm:w-auto">
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-medium shadow hover:bg-[#9A0044] transition"
                                >
                                    <FiPlus />
                                    <span>Add Product</span>
                                </motion.button>
                            </Link>
                        </div>

                        {/* SEARCH + FILTER */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative w-full">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1); // reset page when search changes
                                    }}
                                    className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#9A0044]/20"
                                />
                            </div>

                            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-sm hover:bg-slate-50 transition sm:w-auto w-full">
                                <FiFilter />
                                <span className="sm:hidden">Filter</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* PRODUCTS TABLE */}
                <div className="hidden md:block bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-slate-400 text-[10px] uppercase tracking-[0.15em] font-bold">
                                <th className="text-left px-8 py-6">Product Details</th>
                                <th className="text-left px-8 py-6">Category</th>
                                <th className="text-left px-8 py-6">Price</th>
                                <th className="text-left px-8 py-6">Stock</th>
                                <th className="text-left px-8 py-6">Featured</th>
                                <th className="text-right px-8 py-6">Manage</th>
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
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                                                    <Link href={`/product/${product.slug}`}>
                                                        <img
                                                            src={product.images[0]?.url || "/images/placeholder.png"}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="flex flex-col">
                                                    <Link href={`/product/${product.slug}`} className="font-semibold text-slate-800 text-base leading-tight">
                                                        {product.name}
                                                    </Link>
                                                    <span className="text-xs text-slate-400 mt-1">
                                                        {product.shortDescription}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-8 py-5">
                                            <span className="text-sm text-slate-600 font-medium bg-slate-100 px-3 py-1 rounded-lg">
                                                {product.category}
                                            </span>
                                        </td>

                                        <td className="px-8 py-5 flex flex-col gap-1">
                                            <span className="text-base font-serif text-slate-900 italic">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            {product.oldPrice && (
                                                <span className="text-xs text-slate-400 line-through">
                                                    ${product.oldPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`h-1.5 w-1.5 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"
                                                            }`}
                                                    />
                                                    <span
                                                        className={`text-xs font-bold uppercase tracking-wider ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"
                                                            }`}
                                                    >
                                                        {product.stock > 0 ? "Active" : "Depleted"}
                                                    </span>
                                                </div>
                                                <span className="text-[11px] text-slate-400 ml-3.5">
                                                    {product.stock} units left
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-8 py-5">
                                            {product.featured ? (
                                                <span className="text-xs font-semibold text-white bg-[#9A0044] px-3 py-1 rounded-full">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                                                    Regular
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-8 py-5">
                                            <div className="flex justify-end gap-2 transition-opacity duration-300">
                                                <Link href={`/admin/products/edit/${product._id}`}>
                                                    <button
                                                        title="Edit"
                                                        className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                                    >
                                                        <FiEdit size={18} />
                                                    </button>
                                                </Link>
                                                <button
                                                    title="Delete"
                                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    onClick={() => handleOpenConfirm(product._id)}
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 p-4 flex-wrap">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 bg-slate-100 rounded disabled:opacity-50"
                            >
                                <FiChevronLeft />
                            </button>

                            {/* Numeric Page Buttons */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded ${currentPage === page
                                        ? "bg-[#9A0044] text-white"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 bg-slate-100 rounded disabled:opacity-50"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    )}
                </div>

                {/* MOBILE CARD VIEW */}
                <div className="md:hidden space-y-4">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white p-4 rounded-2xl shadow">
                            <div className="flex gap-4">
                                <img
                                    src={product.images[0]?.url || "/images/placeholder.png"}
                                    className="h-16 w-16 rounded-xl object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-xs text-slate-400">{product.shortDescription}</p>
                                </div>
                            </div>

                            <div className="mt-3 text-sm space-y-1">
                                <p><b>Category:</b> {product.category}</p>
                                <p><b>Price:</b> ${product.price}</p>
                                <p><b>Stock:</b> {product.stock}</p>
                                <p><b>Featured:</b> {product.featured ? "Yes" : "No"}</p>
                            </div>

                            <div className="flex justify-end gap-2 mt-3">
                                <Link href={`/admin/products/edit/${product._id}`}>
                                    <button className="p-2 bg-gray-100 rounded">
                                        <FiEdit />
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleOpenConfirm(product._id)}
                                    className="p-2 bg-red-100 text-red-500 rounded"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Mobile Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 p-4 flex-wrap">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 bg-slate-100 rounded disabled:opacity-50"
                            >
                                <FiChevronLeft />
                            </button>

                            {/* Numeric Page Buttons */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded ${currentPage === page
                                        ? "bg-[#9A0044] text-white"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 bg-slate-100 rounded disabled:opacity-50"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    )}
                </div>

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