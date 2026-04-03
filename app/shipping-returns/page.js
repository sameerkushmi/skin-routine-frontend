import ShippingReturnsPage from "@/components/Layout/Pages/ShippingReturnsPage/ShippingReturnsPage";

export const metadata = {
    title: "Shipping & Returns | SkinRoutine",
    description:
        "Learn about SkinRoutine's shipping options, delivery times, and return policies.",
};

const page = () => {
    return (
        <div>
            <ShippingReturnsPage />
        </div>
    )
}

export default page