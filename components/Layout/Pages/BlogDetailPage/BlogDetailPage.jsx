'use client'

import { useEffect, useState } from "react"
import Newsletter from "@/components/Newsletter/Newsletter"
import ArticleContent from "./ArticleContent/ArticleContent"
import BlogDetialHero from "./BlogDetailHero/BlogDetailHero"
import RelatedArticles from "./RelatedArticles/RelatedArticles"
import SocialShare from "./SocialShare/SocialShare"
import api from "@/components/utils/Api/api"
import BlogNotFound from "./BlogNotFound/BlogNotFound"
import BlogSkeleton from "@/components/Shared/Loader/BlogSkeleton/BlogSkeleton"

const BlogDetailPage = ({ id }) => {

    const [blog, setBlog] = useState()
    const [loading, setLoading] = useState(true)

    const fetchBlogData = async () => {
        try {
            const { data } = await api.get(`/blogs/${id}`)
            setBlog(data.blog)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogData()
    }, [])

    if (loading) return <BlogSkeleton />

    if (!blog) return <BlogNotFound />

    return (
        <div>
            <BlogDetialHero
                title={blog.title || "Default Blog Title"}
                excerpt={blog.excerpt || "Default blog excerpt..."}
                date={blog.createdAt && new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) || "June 15, 2024"}
                heroImage={blog.heroImage?.url || "/images/blog-details/blog-hero.jpg"}
            />
            <ArticleContent
                intro={blog.article.intro || "Default blog excerpt..."}
                sections={blog.article.sections}

                conclusion={blog.article.conclusion}
            />

            <SocialShare
                url="https://skinroutine.com/blog/skincare-tips"
                title={blog.title || "Default Blog Title"}
            />

            <RelatedArticles
                id={blog._id || "default-id"}
            />

            <Newsletter />
        </div>
    )
}

export default BlogDetailPage