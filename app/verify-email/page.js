import VerifyEmailPage from "@/components/Layout/Pages/VerifyEmailPage/VerifyEmailPage"
import { Suspense } from "react"

const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailPage />
        </Suspense>
    )
}

export default page