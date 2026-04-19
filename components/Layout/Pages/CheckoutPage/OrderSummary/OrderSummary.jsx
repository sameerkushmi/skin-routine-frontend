import Image from "next/image"
import { IoShieldCheckmarkOutline } from "react-icons/io5"

const OrderSummary = ({ cartItems, subtotal, shipping, total
}) => {
    return (
        <aside className="lg:col-span-5 lg:sticky lg:top-12">
            <div className="bg-white border border-stone-100 p-8 rounded-[2.5rem] shadow-sm space-y-8">
                <h3 className="text-xl font-serif text-stone-800">Your Selection</h3>

                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map((item) => {
                        const url = item.image ? item.image : item.images[0].url
                        return (
                            <div key={item.id} className="flex gap-4 items-center group">
                                <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-stone-50">
                                    <Image src={url} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="text-sm font-medium text-stone-800">{item.name}</h4>
                                    <p className="text-xs text-stone-400 font-serif italic">Quantity: {item.quantity}</p>
                                    <p className="text-sm font-bold text-stone-900">NRs. {item.price}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="space-y-4 border-t border-stone-50 pt-8">
                    <div className="flex justify-between text-sm text-stone-500">
                        <span>Subtotal</span>
                        <span className="text-stone-900 font-medium">NRs. {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-stone-500">
                        <span>Shipping</span>
                        <span className="text-stone-900 font-medium">NRs. {shipping}</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-stone-50">
                        <div className="space-y-1">
                            <span className="text-lg font-serif text-stone-800">Total</span>
                            <p className="text-[10px] text-stone-400 uppercase tracking-widest italic">Includes GST & duties</p>
                        </div>
                        <span className="text-2xl font-serif text-stone-900">NRs. {total}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-stone-400 py-2">
                    <IoShieldCheckmarkOutline />
                    <span className="text-[10px] uppercase tracking-widest font-medium">100% Secure Checkout</span>
                </div>
            </div>
        </aside>
    )
}

export default OrderSummary