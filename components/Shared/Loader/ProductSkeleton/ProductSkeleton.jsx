"use client";


export default function ProductSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Image */}
            <div className="aspect-[3/4] bg-stone-200 rounded-sm mb-4" />

            {/* Title */}
            <div className="h-3 bg-stone-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-stone-200 rounded w-3/4 mb-3" />

            {/* Price */}
            <div className="flex justify-between items-center">
                <div className="h-4 bg-stone-300 rounded w-16" />
                <div className="h-3 bg-stone-200 rounded w-10" />
            </div>

            {/* Bottom */}
            <div className="flex justify-between mt-3">
                <div className="h-3 bg-stone-200 rounded w-12" />
                <div className="h-3 bg-stone-200 rounded w-16" />
            </div>
        </div>
    );
}