"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiEdit, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import AccountPage from "../../AccountPage";
import api from "@/components/utils/Api/api";
import DeleteConfirm from "@/components/Shared/DeleteConfirm/DeleteConfirm";

export default function AddressPage() {
    const [addresses, setAddresses] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const [form, setForm] = useState({
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
    });

    const [deleteIndex, setDeleteIndex] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    /* ==============================
       FETCH ADDRESSES
    ============================== */
    const fetchAddresses = async () => {
        try {
            setFetchLoading(true);
            const { data } = await api.get("/users/get-all/addresses");
            setAddresses(Array.isArray(data) ? data : data.addresses || []);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load addresses");
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    /* ==============================
       RESET FORM
    ============================== */
    const resetForm = () => {
        setForm({
            phone: "",
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            isDefault: false,
        });
        setEditingIndex(null);
    };

    /* ==============================
       SAVE ADDRESS
    ============================== */
    const saveAddress = async () => {
        try {
            setLoading(true);
            if (editingIndex !== null) {
                await api.put(`/users/update/address/${editingIndex}`, form);
                toast.success("Address updated successfully!");
            } else {
                await api.post("/users/add/address", form);
                toast.success("Address added successfully!");
            }
            await fetchAddresses();
        } catch (error) {
            console.log(error);
            toast.error("Failed To Save Address!");
        } finally {
            setLoading(false);
            resetForm();
        }
    };

    /* ==============================
       DELETE ADDRESS
    ============================== */
    const handleDeleteClick = (index) => {
        setDeleteIndex(index);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setDeleteLoading(true);
            await api.delete(`/users/delete/address/${deleteIndex}`);
            toast.success("Address deleted!");
            await fetchAddresses();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete address!");
        } finally {
            setDeleteLoading(false);
            setDeleteOpen(false);
            setDeleteIndex(null);
        }
    };

    /* ==============================
       SET DEFAULT
    ============================== */
    const handleDefault = async (index) => {
        try {
            setLoading(true);
            const selected = addresses[index];
            await api.put(`/users/update/address/${index}`, {
                ...selected,
                isDefault: true,
            });
            toast.success("Default address updated!");
            await fetchAddresses();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update default");
        } finally {
            setLoading(false);
        }
    };

    /* ==============================
       EDIT ADDRESS
    ============================== */
    const handleEdit = (index) => {
        setEditingIndex(index);
        setForm(addresses[index]);
    };

    return (
        <AccountPage>
            <section className="min-h-screen bg-[#FFF9FA] py-16 px-4 relative">
                {/* Background */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-100/40 blur-[100px]" />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* HEADER */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-serif text-stone-900">
                            Manage <span className="text-pink-300 italic">Addresses</span>
                        </h1>
                        <p className="text-stone-400 mt-2">
                            Add, edit or remove your addresses
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* LEFT */}
                        <div className="lg:col-span-7">
                            {/* FORM */}
                            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl mb-8">
                                <h2 className="text-2xl font-serif mb-6">
                                    {editingIndex !== null ? "Edit Address" : "Add Address"}
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {["phone", "street", "city", "state", "postalCode", "country"].map((field) => (
                                        <input
                                            key={field}
                                            placeholder={field}
                                            value={form[field]}
                                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                            className="p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300"
                                        />
                                    ))}
                                </div>

                                <label className="flex gap-2 mt-4">
                                    <input
                                        type="checkbox"
                                        checked={form.isDefault}
                                        onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                                    />
                                    Set as default
                                </label>

                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={saveAddress}
                                        className="flex-1 bg-zinc-800 hover:bg-zinc-900 text-white py-3 rounded-full"
                                    >
                                        {loading ? "Saving..." : editingIndex !== null ? "Update" : "Add"}
                                    </button>
                                    {editingIndex !== null && (
                                        <button onClick={resetForm} className="flex-1 bg-gray-200 rounded-full">
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* LIST */}
                            {fetchLoading ? (
                                <p className="text-center text-stone-400">Loading addresses...</p>
                            ) : addresses.length === 0 ? (
                                <p className="text-center text-stone-400 italic">No addresses found</p>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {addresses.map((addr, index) => (
                                            <motion.div
                                                key={index}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="p-6 rounded-3xl bg-white/80 shadow-xl flex justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        {addr.isDefault && <span className="ml-2 text-pink-500 text-sm">Default</span>}
                                                    </p>
                                                    <p>{addr.phone}</p>
                                                    <p className="text-sm text-stone-500">{addr.street}, {addr.city}</p>
                                                </div>

                                                <div className="flex gap-3">
                                                    {!addr.isDefault && (
                                                        <button onClick={() => handleDefault(index)}><FiCheck /></button>
                                                    )}
                                                    <button onClick={() => handleEdit(index)}><FiEdit /></button>
                                                    <button onClick={() => handleDeleteClick(index)}><FiTrash2 /></button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* RIGHT */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24 bg-white/70 p-8 rounded-3xl shadow-xl">
                                <h3 className="text-sm uppercase text-stone-400 mb-4">Tips</h3>
                                <p className="text-stone-500 text-sm">
                                    Keep your default address updated for faster checkout experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DELETE CONFIRM MODAL */}
                <DeleteConfirm
                    isOpen={deleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    loading={deleteLoading}
                    title="Delete this address?"
                />
            </section>
        </AccountPage>
    );
}