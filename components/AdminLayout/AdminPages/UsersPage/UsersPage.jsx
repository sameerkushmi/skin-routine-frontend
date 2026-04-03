'use client';

import { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";
import api from "@/components/utils/Api/api";
import { FiEdit2, FiSearch, FiTrash2, FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";
import Image from "next/image";
import DeleteConfirm from "@/components/Shared/DeleteConfirm/DeleteConfirm";
import UserForm from "./UserForm/UserForm";
import MobileCards from "./MobileCards/MobileCards";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const usersPerPage = 10;

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // State
    const [editUser, setEditUser] = useState(null);
    const [formOpen, setFormOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/users/get-all", {
                params: { page: currentPage, limit: usersPerPage, search }
            });
            setUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 300); // Debounce search
        return () => clearTimeout(delayDebounceFn);
    }, [currentPage, search]);

    // Open confirm modal
    const handleOpenConfirm = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };


    const deleteUser = async () => {
        if (!deleteId) return;

        // Save current state for rollback if needed
        const previousUsers = [...users];

        // Optimistically remove the user from the UI
        setUsers(users.filter(user => user._id !== deleteId));
        setConfirmOpen(false);
        setDeleteId(null);

        try {
            setDeleteLoading(true);
            await api.delete(`/users/delete/${deleteId}`);
            toast.success("User deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user, rolling back");

            // Rollback to previous state
            setUsers(previousUsers);
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="px-3 sm:px-6 py-4 sm:py-8 max-w-[1600px] mx-auto bg-gray-50/50 min-h-screen">

                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                            User Management
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Manage and monitor users
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
                        {/* Search */}
                        <div className="relative w-full sm:w-72">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="pl-9 pr-3 py-2 w-full text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => {
                                setEditUser(null);
                                setFormOpen(true);
                            }}
                            className="w-full sm:w-auto text-sm px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                        >
                            + Add
                        </button>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white hidden md:block border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Contact</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Role</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Verified</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Joined Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan="5" className="px-6 py-4"><div className="h-10 bg-gray-100 rounded-lg w-full"></div></td>
                                        </tr>
                                    ))
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <FiUser size={48} className="mb-2 opacity-20" />
                                                <p>No users found matching your search</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                                                        <Image
                                                            src={user.avatar?.url || '/images/profile/default.jpg'}
                                                            alt={user.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-xs text-gray-500">ID: {user._id.slice(-6)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center text-sm text-gray-600 gap-2">
                                                        <FiMail size={14} className="text-gray-400" /> {user.email}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 gap-2">
                                                        <FiPhone size={14} className="text-gray-400" /> {user.phone || '—'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${user.role === 'admin'
                                                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px py-4 flex items-center justify-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isEmailVerified
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-yellow-50 text-yellow-600"
                                                    }`}>
                                                    {user.isEmailVerified ? "Verified" : "Unverified"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-sm text-gray-500 gap-2">
                                                    <FiCalendar size={14} />
                                                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                        title="Edit User"
                                                        onClick={() => {
                                                            setEditUser(user);
                                                            setFormOpen(true);
                                                        }}
                                                    >
                                                        <FiEdit2 size={16} />
                                                    </button>
                                                    <button
                                                        disabled={deleteLoading}
                                                        onClick={() => handleOpenConfirm(user._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete User"
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                            <p className="text-sm text-gray-500">
                                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                            </p>
                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`min-w-[32px] h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${currentPage === i + 1
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-500 hover:text-indigo-500'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile views cards */}
                <MobileCards users={users} handleOpenConfirm={handleOpenConfirm} deleteLoading={deleteLoading} setEditUser={setEditUser} setFormOpen={setFormOpen} />


                <DeleteConfirm
                    isOpen={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={deleteUser}
                    loading={deleteLoading}
                />
                <UserForm
                    isOpen={formOpen}
                    onClose={() => setFormOpen(false)}
                    initialData={editUser}
                    onSave={(updatedUser) => {
                        if (editUser) {
                            // Optimistic update
                            setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
                        } else {
                            // Optimistic add
                            setUsers([updatedUser, ...users]);
                        }
                    }}
                />
            </div>
        </AdminLayout>
    );
};

export default UsersPage;