import OrderDetailsPage from "@/components/Layout/Pages/AccountPage/Pages/OrdersPage/OrderDetailsPage/OrderDetailsPage"
import { Suspense } from "react"

const page = async () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderDetailsPage />
        </Suspense>
    )
}

export default page