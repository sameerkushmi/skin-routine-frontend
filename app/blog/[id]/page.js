import BlogDetailPage from "@/components/Layout/Pages/BlogDetailPage/BlogDetailPage";

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
        method: "GET",
        cache: "no-store"
    })

    const { blogs } = await res.json()

    return blogs.map((blog) => ({
        id: blog._id.toString()
    }))
}


export default async function page({ params }) {
    const { id } = await params
    return (
        <div>
            <BlogDetailPage id={id} />
        </div>
    );
}
