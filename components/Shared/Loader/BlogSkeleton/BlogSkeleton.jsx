const BlogSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Image */}
            <div className="aspect-[16/10] rounded-[32px] skeleton" />

            {/* Content */}
            <div className="space-y-3 px-2">
                <div className="h-3 w-20 skeleton rounded" />
                <div className="h-5 w-full skeleton rounded" />
                <div className="h-4 w-4/5 skeleton rounded" />
                <div className="h-4 w-3/5 skeleton rounded" />
            </div>
        </div>
    );
};

export default BlogSkeleton;