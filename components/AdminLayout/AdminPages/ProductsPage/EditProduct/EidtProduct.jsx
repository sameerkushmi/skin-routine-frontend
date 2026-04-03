'use client'
import { useEffect, useState } from "react";
import ProductForm from "../ProductForm/ProductForm";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import Loader from "@/components/Shared/Loader/Loader";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";

const EditProduct = ({ id }) => {

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        const { data } = await api.get(`/products/get-by-id/${id}`)
        setProduct(data.product)
    }

    const handleUpdate = async (formData, resetFormCallback) => {
        try {
            setLoading(true)

            await api.put(`/products/${id}`, formData)

            toast.success("Product updated")
            resetFormCallback()
        } catch (err) {
            console.log("edit product error:", err)
            toast.error("Update failed")
        } finally {
            setLoading(false)
        }
    }

    if (!product) return <Loader />

    return (
        <AdminLayout>
            <ProductForm
                mode="edit"
                initialData={product}
                onSubmit={handleUpdate}
                loading={loading}
            />
        </AdminLayout>
    )
}

export default EditProduct