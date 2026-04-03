import OrderDetailsPage from "@/components/Layout/Pages/AccountPage/Pages/OrdersPage/OrderDetailsPage/OrderDetailsPage"

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/get-all`, {
        method: 'GET',
        cache: 'no-store',
    })
    const { orders } = await res.json()

    return orders.map((o) => ({
        id: o._id.toString(),
    }))
}

const page = async ({ params }) => {

    const { id } = await params

    return (
        <div>
            <OrderDetailsPage id={id} />
        </div>
    )
}

export default page