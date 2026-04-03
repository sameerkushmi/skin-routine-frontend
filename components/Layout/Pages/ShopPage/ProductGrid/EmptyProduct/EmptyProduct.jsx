import { FiSearch } from "react-icons/fi"

const EmptyProduct = ({
    setSearch, setFilters
}) => {
    return (
        <section className="bg-[#FAF9F6] px-6 py-20">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">

                {/* Icon */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-stone-100 mb-6">
                    <FiSearch size={28} className="text-stone-400" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-serif text-stone-900 mb-2">
                    No products found
                </h2>

                {/* Description */}
                <p className="text-stone-500 text-sm max-w-md mb-6">
                    We couldn’t find any products matching your filters. Try adjusting or clearing them.
                </p>

                {/* Action */}
                <button
                    onClick={() => {
                        setSearch("");
                        setFilters({
                            category: [],
                            skinType: [],
                            concerns: [],
                            ingredients: [],
                            minPrice: 500,
                            maxPrice: 5000,
                            rating: null,
                        });
                    }}
                    className="px-6 py-3 bg-stone-900 text-white text-sm uppercase tracking-wider rounded-full hover:bg-stone-800 transition"
                >
                    Reset Filters
                </button>
            </div>
        </section>
    )
}

export default EmptyProduct