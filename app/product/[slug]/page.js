import ProductDetalPage from "@/components/Layout/Pages/ProductDetalPage/ProductDetalPage"

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/slug`,{
        cache: "no-store",
        method: "GET"
    })
    const data = await res.json()
    return data.products.map((item) => ({
        slug: item.slug
    }))
}

const page = async ({ params }) => {
    const { slug } = await params
    return (
        <div>
            <ProductDetalPage slug={slug} />
        </div>
    )
}

export default page