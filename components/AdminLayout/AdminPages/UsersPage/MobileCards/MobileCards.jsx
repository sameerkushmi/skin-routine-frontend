import Image from "next/image";
import { FiCalendar, FiEdit2, FiMail, FiPhone, FiTrash2, FiUser } from "react-icons/fi";

const MobileCards = ({ users, loading, deleteLoading, handleOpenConfirm, setEditUser, setFormOpen
}) => {
    return (
        <div className="grid gap-3 md:hidden">
            {loading ? (
                [...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-white rounded-lg animate-pulse"></div>
                ))
            ) : users.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                    <FiUser size={32} className="mx-auto mb-2 opacity-20" />
                    No users found
                </div>
            ) : (
                users.map((user) => (
                    <div
                        key={user._id}
                        className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                    >
                        {/* Top */}
                        <div className="flex items-center gap-3">
                            <div className="relative h-9 w-9 rounded-full overflow-hidden">
                                <Image
                                    src={user.avatar?.url || '/images/profile/default.jpg'}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.name}
                                </p>
                                <p className="text-[10px] text-gray-400">
                                    #{user._id.slice(-6)}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-1">
                                <button
                                    onClick={() => {
                                        setEditUser(user);
                                        setFormOpen(true);
                                    }}
                                    className="p-2 text-gray-400 hover:text-indigo-600"
                                >
                                    <FiEdit2 size={14} />
                                </button>
                                <button
                                    disabled={deleteLoading}
                                    onClick={() => handleOpenConfirm(user._id)}
                                    className="p-2 text-gray-400 hover:text-red-600"
                                >
                                    <FiTrash2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="mt-2 text-xs text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                                <FiMail size={12} /> {user.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <FiPhone size={12} /> {user.phone || '—'}
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                                {user.role}
                            </span>

                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${user.isEmailVerified
                                    ? "bg-green-50 text-green-600"
                                    : "bg-yellow-50 text-yellow-600"
                                }`}>
                                {user.isEmailVerified ? "Verified" : "Pending"}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default MobileCards