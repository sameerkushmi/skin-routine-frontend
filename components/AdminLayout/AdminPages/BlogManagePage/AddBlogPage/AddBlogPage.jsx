"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/components/utils/Api/api";
import BlogForm from "../BlogForm/BlogForm";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

export default function AddBlogPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreate = async (formData) => {
        try {
            setLoading(true);

            await api.post("/blogs", formData);

            toast.success("Blog created successfully");
            router.push("/admin/blogs");
        } catch (error) {
            console.error(error.response.data.message);
            toast.error("Failed to create blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>

                <BlogForm onSubmit={handleCreate} loading={loading} />
            </div>
        </AdminLayout>
    );
}
