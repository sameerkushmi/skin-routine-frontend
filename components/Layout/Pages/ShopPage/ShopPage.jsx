'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";
import ProductGrid from "./ProductGrid/ProductGrid";
import ShopHero from "./ShopHero/ShopHero";
import SortDropdown from "./SortDropdown/SortDropdown";
import Pagination from "./Pagination/Pagination";
import api from "@/components/utils/Api/api";
import { useMyContext } from "@/components/utils/Context/Context";
import { useDebounce } from "@/components/utils/useDebounce/useDebounce";
import Newsletter from "@/components/Newsletter/Newsletter";
import TrustSignals from "./TrustSignals/TrustSignals";

const ShopPage = () => {
    const searchParams = useSearchParams();
    const [filtersReady, setFiltersReady] = useState(false);

    const [sort, setSort] = useState("featured");
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const { setLoading } = useMyContext();

    const [filters, setFilters] = useState({
        category: [],
        brand: [],
        skinType: [],
        concerns: [],
        ingredients: [],
        minPrice: 500,
        maxPrice: 5000,
        rating: null,
    });

    // ✅ Apply ALL URL params (search + category)
    useEffect(() => {
        const categoryFromUrl = searchParams.get("category");
        const searchFromUrl = searchParams.get("search");
        const brandFromUrl = searchParams.get("brand");

        setFilters(prev => ({
            ...prev,
            category: categoryFromUrl ? [categoryFromUrl] : [],
            brand: brandFromUrl ? [brandFromUrl] : [],
        }));

        if (searchFromUrl) {
            setSearch(searchFromUrl);
        }

        setFiltersReady(true);
    }, [searchParams]);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const { data } = await api.get("/products/get-all", {
                params: {
                    page: currentPage,
                    limit: productsPerPage,
                    search: debouncedSearch,
                    sort,
                    brand: filters.brand.join(","),
                    category: filters.category.join(","),
                    skinType: filters.skinType.join(","),
                    concerns: filters.concerns.join(","),
                    ingredients: filters.ingredients.join(","),
                    minPrice: filters.minPrice !== 500 ? filters.minPrice : undefined,
                    maxPrice: filters.maxPrice !== 5000 ? filters.maxPrice : undefined,
                    rating: filters.rating,
                },
            });

            setProducts(data.products);
            setTotalPages(data.totalPages);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Reset page when anything changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, debouncedSearch, sort]);

    // ✅ Prevent early API call
    useEffect(() => {
        if (filtersReady) {
            fetchProducts();
        }
    }, [currentPage, sort, debouncedSearch, filters, filtersReady]);

    return (
        <div>
            {/* <ShopHero /> */}

            <div className="max-w-7xl mx-auto px-6 py-18">

                <div className="flex justify-between mb-8">
                    <h2 className="text-lg font-medium">
                        {search ? `Search results for "${search}"` : "All Products"}
                    </h2>
                    <SortDropdown selected={sort} setSelected={setSort} />
                </div>

                <div className="lg:flex gap-12">

                    <FiltersSidebar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        search={search}
                        setSearch={setSearch}
                        filters={filters}
                        setFilters={setFilters}
                    />

                    <div className="flex-1">
                        <ProductGrid
                            products={products}
                            setSearch={setSearch}
                            setFilters={setFilters}
                        />

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />
                        )}
                    </div>

                </div>
            </div>

            <TrustSignals />
            <Newsletter />
        </div>
    );
};

export default ShopPage;