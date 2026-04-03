import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const Header = ({ mode, loading, handleSubmit }) => {
    return (
        <div className="sticky top-0 z-50 bg-white border-b border-stone-200 flex items-center justify-between py-3">

            <div className="flex items-center gap-1">
                <Link
                    href="/admin/products"
                    className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                >
                    <FiArrowLeft />
                </Link>

                <h1 className="md:text-2xl font-serif text-slate-900">
                    {mode === "edit" ? "Edit Product" : "Add New Product"}
                </h1>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-slate-900 text-white md:px-6 py-2 px-3 md:py-3 rounded-full text-xs md:text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-50 flex items-center gap-2"
            >
                {loading && (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                )}
                {loading
                    ? mode === "edit"
                        ? "Updating..."
                        : "Saving..."
                    : mode === "edit"
                        ? "Update Product"
                        : "Save Product"}
            </button>

        </div>
    );
};

export default Header;