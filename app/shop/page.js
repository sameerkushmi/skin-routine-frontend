import ShopPage from "@/components/Layout/Pages/ShopPage/ShopPage"
import { Suspense } from "react"

const shoppage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPage />
    </Suspense>
  )
}

export default shoppage