import Image from "next/image"
import { RiSecurePaymentLine } from "react-icons/ri"

const InformationFlow = ({ form, handleChange, total, paymentMethod, setPaymentMethod, handleCheckout, paymentOptions
}) => {
    return (
        <div className="lg:col-span-7 space-y-12">
            <header className="space-y-2">
                <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-bold">Secure Checkout</span>
                <h2 className="text-4xl md:text-5xl font-serif text-stone-900 italic">Complete <span className="not-italic font-normal">Order</span></h2>
            </header>

            {/* CONTACT SECTION */}
            <div className="relative">
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="premium-input peer"
                    disabled
                />
                <label className="floating-label">Email Address</label>
            </div>

            {/* SHIPPING SECTION */}
            <input
                placeholder="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="premium-input"
                disabled
            />
            <div className="grid md:grid-cols-2 gap-4">
                <input
                    placeholder="Street Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="premium-input"
                />
                <input
                    placeholder="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="premium-input"
                />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <input
                    placeholder="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="premium-input"
                />
                <input
                    placeholder="ZIP Code"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    className="premium-input"
                />
                <input
                    placeholder="Country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="premium-input"
                />
            </div>
            <input
                placeholder="Phone (For delivery updates)"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="premium-input"
            />

            {/* PAYMENT SECTION */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                    <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-serif">3</span>
                    <h3 className="text-xl font-serif text-stone-800">Payment Selection</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setPaymentMethod(option.id)}
                            className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col justify-between h-32 ${paymentMethod === option.id
                                ? "border-stone-900 bg-white shadow-md scale-[1.02]"
                                : "border-stone-100 bg-stone-50/50 hover:border-stone-200"
                                }`}
                        >
                            <div className="relative flex justify-between items-start w-full">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === option.id ? "border-stone-900" : "border-stone-300"}`}>
                                    {paymentMethod === option.id && <div className="w-2 h-2 rounded-full bg-stone-900" />}
                                </div>
                                {option.icon ? (
                                    <Image
                                        width={70}
                                        height={70}
                                        src={option.icon}
                                        alt={option.label}
                                        className={`object-contain transition-all duration-300 
                                                        ${paymentMethod === option.id
                                                ? "grayscale-0 opacity-100 scale-105"
                                                : "grayscale opacity-60"
                                            }`}
                                    />
                                ) : (
                                    <RiSecurePaymentLine
                                        size={25}
                                        className={`transition-all duration-300 
                                                        ${paymentMethod === option.id
                                                ? "text-stone-900 scale-110 drop-shadow-sm"
                                                : "text-stone-400"
                                            }`}
                                    />
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-xs uppercase tracking-widest text-stone-800">{option.label}</p>
                                <p className="text-[10px] text-stone-400 mt-1 uppercase">{option.sub || "Instant Pay"}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            <button
                className="group relative w-full bg-stone-900 text-white py-6 rounded-full overflow-hidden transition-all hover:bg-stone-800"
                onClick={handleCheckout}
            >
                <span className="relative z-10 flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-[0.3em]">
                    Complete Purchase — ₹{total}
                </span>
                <div className="absolute inset-0 bg-pink-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
            <style jsx>{`
                .premium-input {
                    width: 100%;
                    background: transparent;
                    border-bottom: 1.5px solid #E7E5E4;
                    padding: 16px 0px;
                    font-size: 0.875rem;
                    outline: none;
                    transition: all 0.3s ease;
                }
                .premium-input:focus {
                    border-bottom-color: #1C1917;
                }
                .floating-label {
                    position: absolute;
                    left: 0;
                    top: 16px;
                    font-size: 0.875rem;
                    color: #A8A29E;
                    pointer-events: none;
                    transition: all 0.3s ease;
                    opacity: 0;
                }
                .premium-input:focus + .floating-label,
                .premium-input:not(:placeholder-shown) + .floating-label {
                    top: -12px;
                    font-size: 0.65rem;
                    opacity: 1;
                    color: #D946EF;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
            `}</style>
        </div>
    )
}

export default InformationFlow