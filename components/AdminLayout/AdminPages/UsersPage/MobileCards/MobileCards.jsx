import Image from "next/image";
import { FiCalendar, FiEdit2, FiMail, FiPhone, FiTrash2, FiUser } from "react-icons/fi";

const MobileCards = ({ users, loading, deleteLoading, handleOpenConfirm, setEditUser, setFormOpen
}) => {
    return (
        < div className="grid gap-4 md:hidden" >
            {
                loading ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="h-24 bg-white rounded-xl animate-pulse"></div>
                    ))
                ) : users.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">
                        <FiUser size={40} className="mx-auto mb-2 opacity-20" />
                        No users found
                    </div>
                ) : (
                    users.map((user) => (
                        <div key={user._id} className="bg-white p-4 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                    <Image
                                        src={user.avatar?.url || '/images/profile/default.jpg'}
                                        alt={user.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">
                                        ID: {user._id.slice(-6)}
                                    </p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex items-center gap-2">
                                    <FiMail size={14} /> {user.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiPhone size={14} /> {user.phone || '—'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCalendar size={14} />
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
                                    {user.role}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        className="p-2 text-gray-500 hover:text-indigo-600"
                                        onClick={() => {
                                            setEditUser(user);
                                            setFormOpen(true);
                                        }}
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        disabled={deleteLoading}
                                        onClick={() => handleOpenConfirm(user._id)}
                                        className="p-2 text-gray-500 hover:text-red-600"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
        </div >
    )
}

export default MobileCards