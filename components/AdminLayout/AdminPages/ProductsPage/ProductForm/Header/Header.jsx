import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const Header = ({ mode, loading, handleSubmit }) => {
    return (
        <div className="sticky top-0 z-50 bg-white border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between py-3 px-3 sm:px-6 gap-2 sm:gap-0">

            {/* Left: Back Button + Title */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                    href="/admin/products"
                    className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition"
                >
                    <FiArrowLeft size={18} />
                </Link>

                <h1 className="text-sm sm:text-lg md:text-2xl font-serif text-slate-900 truncate">
                    {mode === "edit" ? "Edit Product" : "Add New Product"}
                </h1>
            </div>

            {/* Right: Save/Update Button */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-2 sm:mt-0 bg-slate-900 text-white px-3 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-50 flex items-center gap-2 justify-center w-full sm:w-auto"
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