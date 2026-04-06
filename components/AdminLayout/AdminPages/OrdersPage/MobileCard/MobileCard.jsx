const MobileCard = ({orders, setSelectedOrder, setDrawerOpen, getStatusStyles }) => {
    return (
        <div className="md:hidden divide-y divide-slate-100">
            {orders.map((order) => (
                <div
                    key={order._id}
                    onClick={() => { setSelectedOrder(order); setDrawerOpen(true); }}
                    className="p-4 active:bg-slate-50"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <span className="font-mono text-xs font-bold text-indigo-600">#{order._id.slice(-8).toUpperCase()}</span>
                            <p className="text-sm font-bold text-slate-800 mt-1">{order.user?.name || "Guest User"}</p>
                        </div>
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${getStatusStyles(order.orderStatus)}`}>
                            {order.orderStatus.toUpperCase()}
                        </span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">{order.paymentMethod}</p>
                            <p className="text-sm font-bold text-slate-900">NRs. {order.totalAmount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-slate-700">
                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileCard