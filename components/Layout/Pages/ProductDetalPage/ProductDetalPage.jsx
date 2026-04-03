'use client'
import { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails/ProductDetails"
import ProductTabs from "./ProductTabs/ProductTabs";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import api from "@/components/utils/Api/api";
import Loader from "@/components/Shared/Loader/Loader";

const ProductDetalPage = ({ slug }) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/get-by-slug/${slug}`)
                console.log(data)
                setProduct(data.product)
            } catch (error) {
                console.log("product detail page error :", error)
            }

        }

        fetchProduct()
    }, [])

    if (!product) return <Loader />

    return (
        <div>
            <ProductDetails product={product} />
            <ProductTabs product={product} />
            <ReviewsSection id={product._id} />
            <RelatedProducts id={product._id} />
        </div>
    )
}

export default ProductDetalPage