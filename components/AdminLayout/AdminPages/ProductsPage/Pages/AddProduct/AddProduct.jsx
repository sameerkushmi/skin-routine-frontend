'use client'
import { useState } from "react";
import api from "@/components/utils/Api/api";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import toast from "react-hot-toast";
import ProductForm from "../../ProductForm/ProductForm";

const AddProduct = () => {

    const [loading, setLoading] = useState(false)

    const handleCreate = async (formData, resetFormCallback) => {
        try {
            setLoading(true)

            await api.post("/products/create", formData)

            toast.success("Product created")
            resetFormCallback()
        } catch (err) {
            console.log("Error creating product", err?.response?.data?.message)
            toast.error(err?.response?.data?.message || "Error creating product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            <ProductForm
                mode="add"
                onSubmit={handleCreate}
                loading={loading}
            />
        </AdminLayout>
    )
}

export default AddProduct