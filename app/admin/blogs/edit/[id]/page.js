import EditBlogPage from "@/components/AdminLayout/AdminPages/BlogManagePage/Pages/EditBlogPage/EditBlogPage"

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
        method: "GET",
        cache: "no-store",
    })

    const { blogs } = await res.json()

    return blogs.map((blog) => ({
        id: blog._id.toString(),
    }))
}


const page = async ({ params }) => {

    const { id } = await params
    return (
        <div>
            <EditBlogPage id={id} />
        </div>
    )
}

export default page