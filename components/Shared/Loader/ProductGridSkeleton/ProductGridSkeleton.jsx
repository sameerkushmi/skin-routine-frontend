"use client";

import ProductSkeleton from "../ProductSkeleton/ProductSkeleton";

export default function ProductGridSkeleton({
    numberOfProducts = 10,
}) {
    return (
        <section className="bg-[#FAF9F6] px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header Skeleton */}
                <div className="flex justify-between mb-16">
                    <div>
                        <div className="h-6 w-40 bg-stone-200 rounded mb-2" />
                        <div className="h-4 w-60 bg-stone-200 rounded" />
                    </div>
                    <div className="h-4 w-32 bg-stone-200 rounded" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                    {Array.from({ length: numberOfProducts }).map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}