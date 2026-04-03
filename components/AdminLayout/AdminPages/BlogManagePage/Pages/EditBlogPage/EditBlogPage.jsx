"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/components/utils/Api/api";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import Loader from "@/components/Shared/Loader/Loader";
import { useRouter } from "next/navigation";
import BlogForm from "../../BlogForm/BlogForm";

export default function EditBlogPage({ id }) {

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const router = useRouter()

    // Fetch blog by ID
    const fetchBlog = async () => {
        try {
            const { data } = await api.get(`/blogs/${id}`);
            setBlog(data.blog || res); // depends on interceptor
            console.log(data.blog)
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch blog");
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchBlog();
    }, [id]);

    // Update blog
    const handleUpdate = async (formData) => {
        try {
            setLoading(true);

            await api.put(`/blogs/${id}`, formData);

            toast.success("Blog updated successfully");
            router.push("/admin/blogs");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return <Loader />
    }

    if (!blog) {
        return <div className="p-6 text-center">Blog not found</div>;
    }

    return (
        <AdminLayout>

            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

                <BlogForm
                    initialData={blog}
                    onSubmit={handleUpdate}
                    loading={loading}
                />
            </div>
        </AdminLayout>
    );
}
