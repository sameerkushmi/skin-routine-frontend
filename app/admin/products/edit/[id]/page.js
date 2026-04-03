import EditProduct from "@/components/AdminLayout/AdminPages/ProductsPage/Pages/EditProduct/EidtProduct"

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/get-all`,{
        method: "GET",
        cache: "no-store",
    })
    const data = await res.json()

    return data.products.map(p => ({
        id: p._id.toString()
    }))
}

const page = async ({ params }) => {
    const { id } = await params

    return (
        <EditProduct id={id} />
    )
}

export default page