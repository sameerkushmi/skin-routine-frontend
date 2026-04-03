"use client"

import { useEffect, useState } from "react"
import Newsletter from "@/components/Newsletter/Newsletter"
import BlogFilters from "./BlogFilters/BlogFilters"
import BlogGrid from "./BlogGrid/BlogGrid"
import BlogHero from "./BlogHero/BlogHero"
import api from "@/components/utils/Api/api"

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)

    // 🔥 filters state
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [page, setPage] = useState(1)

    const [pagination, setPagination] = useState({})

    const fetchBlogs = async () => {
        try {
            setLoading(true)

            const { data } = await api.get("/blogs", {
                params: {
                    search,
                    category: category === "All" ? "" : category,
                    page,
                    limit: 6
                }
            })

            setBlogs(data.blogs)
            setPagination(data.pagination)

        } catch (error) {
            console.log(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    // 🔁 refetch on filter change
    useEffect(() => {
        fetchBlogs()
    }, [search, category, page])

    return (
        <>
            <BlogHero />

            <BlogFilters
                blogs={blogs}
                onSearch={(val) => {
                    setPage(1)
                    setSearch(val)
                }}
                onCategoryChange={(val) => {
                    setPage(1)
                    setCategory(val)
                }}
            />

            <BlogGrid posts={blogs} loading={loading} />

            {/* ✅ Pagination */}
            <div className="flex justify-center gap-2 my-10">
                {[...Array(pagination.pages || 0)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 text-sm border rounded ${page === i + 1
                                ? "bg-pink-500 text-white"
                                : "bg-white text-slate-600"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <Newsletter />
        </>
    )
}

export default BlogsPage