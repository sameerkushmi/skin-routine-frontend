import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";

const MobileCard = ({
  products,
  totalPages,
  currentPage,
  setCurrentPage,
  handleOpenConfirm,
}) => {
  return (
    <div className="md:hidden space-y-3 px-2">
      {products.map((product) => (
        <div key={product._id} className="bg-white p-3 rounded-2xl shadow-sm">
          <div className="flex gap-3 items-center">
            <Image
              src={product.images[0]?.url || "/images/placeholder.png"}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl object-cover"
              width={56}
              height={56}
              alt={product.name}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                {product.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-2">
                {product.shortDescription}
              </p>
            </div>
          </div>

          <div className="mt-2 text-[11px] sm:text-sm space-y-1">
            <p>
              <b>Category:</b>{" "}
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{product.category}</span>
            </p>
            <p>
              <b>Price:</b> ${product.price.toLocaleString()}
              {product.oldPrice && (
                <span className="line-through text-slate-400 ml-1 text-[10px]">${product.oldPrice.toLocaleString()}</span>
              )}
            </p>
            <p className="flex items-center gap-1">
              <b>Stock:</b>{" "}
              <span
                className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
              />{" "}
              {product.stock > 0 ? "Active" : "Depleted"} ({product.stock})
            </p>
            <p>
              <b>Featured:</b>{" "}
              <span className={`px-2 py-0.5 rounded text-[10px] ${product.featured ? "bg-[#9A0044] text-white" : "bg-slate-100 text-slate-500"}`}>
                {product.featured ? "Yes" : "No"}
              </span>
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <Link href={`/admin/products/edit/${product._id}`}>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition">
                <FiEdit size={16} />
              </button>
            </Link>
            <button
              onClick={() => handleOpenConfirm(product._id)}
              className="p-2 bg-red-100 text-red-500 rounded hover:bg-red-200 transition"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Mobile Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 sm:gap-2 p-3 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-slate-100 rounded disabled:opacity-50"
          >
            <FiChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 sm:px-3 py-1 rounded ${currentPage === page
                ? "bg-[#9A0044] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 bg-slate-100 rounded disabled:opacity-50"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileCard;