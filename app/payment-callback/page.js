import PaymentCallback from "@/components/Layout/Pages/PaymentCallback/PaymentCallback"
import { Suspense } from "react"

const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentCallback />
        </Suspense>
    )
}

export default page