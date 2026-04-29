'use client';

import { useEffect, useState } from "react";
import { FiX, FiFilter, FiSearch } from "react-icons/fi";

export default function FiltersSidebar({
    isOpen,
    setIsOpen,
    search,
    setSearch,
    filters,
    setFilters
}) {

    const categories = ["cleanser", "cream", "moisturizer", "sunscreen"];
    const skinTypes = ["oily", "dry", "combination", "sensitive", "acne prone"];
    const concerns = ["acne", "pigmentation", "anti-aging", "dark spots", "hydration"];
    const ingredients = ["vitamin c", "niacinamide", "retinol", "hyaluronic acid"];
    const brands = ["skin-routine"];

    const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);

    useEffect(() => {
        setLocalMaxPrice(filters.maxPrice);
    }, [filters.maxPrice]);

    const handleCheckbox = (type, value) => {
        setFilters((prev) => {
            const exists = prev[type].includes(value);

            return {
                ...prev,
                [type]: exists
                    ? prev[type].filter((item) => item !== value)
                    : [...prev[type], value],
            };
        });
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const FilterSection = ({ title, items, type }) => (
        <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider">
                {title}
            </h4>

            <div className="space-y-2">
                {items.map((item, index) => (
                    <label key={index} className="flex capitalize items-center gap-2 text-sm text-stone-600 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters[type].includes(item)}
                            onChange={() => handleCheckbox(type, item)}
                            className="accent-stone-900 w-4 h-4"
                        />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {/* MOBILE BUTTON */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm"
                >
                    <FiFilter />
                    Filters
                </button>
            </div>

            {/* OVERLAY */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-[300px] bg-white z-50 md:z-40 transform transition-transform duration-300 overflow-y-auto p-6 space-y-8
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                {/* Mobile Header */}
                <div className="flex justify-between items-center lg:hidden">
                    <h3 className="font-semibold">Filters</h3>
                    <button onClick={() => setIsOpen(false)}>
                        <FiX size={20} />
                    </button>
                </div>

                {/* SEARCH */}
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-stone-100 rounded-full outline-none"
                    />
                </div>

                {/* FILTERS */}
                <FilterSection title="Brand" items={brands} type="brand" />
                <FilterSection title="Category" items={categories} type="category" />
                <FilterSection title="Skin Type" items={skinTypes} type="skinType" />
                <FilterSection title="Concerns" items={concerns} type="concerns" />

                {/* PRICE */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase">Price</h4>

                    <div className="flex justify-between text-xs text-stone-500">
                        <span>₹{filters.minPrice}</span>
                        <span>₹{localMaxPrice}</span>
                    </div>

                    <input
                        type="range"
                        min="500"
                        max="5000"
                        step="100"
                        value={localMaxPrice}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setLocalMaxPrice(value); // smooth UI
                        }}
                        onMouseUp={() => {
                            setFilters((prev) => ({
                                ...prev,
                                maxPrice: localMaxPrice,
                            }));
                        }}
                        onTouchEnd={() => {
                            setFilters((prev) => ({
                                ...prev,
                                maxPrice: localMaxPrice,
                            }));
                        }}
                        className="w-full"
                    />
                </div>

                {/* RATING */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase">Rating</h4>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === 4}
                            onChange={() => setFilters((p) => ({ ...p, rating: 4 }))}
                        />
                        4★ & above
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === 3}
                            onChange={() => setFilters((p) => ({ ...p, rating: 3 }))}
                        />
                        3★ & above
                    </label>
                </div>

                <FilterSection title="Ingredients" items={ingredients} type="ingredients" />

                {/* CLEAR */}
                <button
                    onClick={() => {
                        setSearch("");
                        setFilters({
                            category: [],
                            brand: [],
                            skinType: [],
                            concerns: [],
                            ingredients: [],
                            minPrice: 500,
                            maxPrice: 5000,
                            rating: null,
                        });
                    }}
                    className="w-full py-2 bg-stone-100 rounded-full text-sm"
                >
                    Clear Filters
                </button>
            </aside>
        </>
    );
}