import { FiShield, FiCheckCircle, FiTruck, FiRotateCcw, FiLock } from "react-icons/fi";

const TrustSignals = () => {
    const signals = [
        {
            icon: <FiCheckCircle />,
            title: "100% Authentic",
            desc: "Direct from global labs.",
        },
        {
            icon: <FiShield />,
            title: "Derm-Approved",
            desc: "Clinically safe formulas.",
        },
        {
            icon: <FiTruck />,
            title: "Express Delivery",
            desc: "Free on orders over ₹999.",
        },
        {
            icon: <FiRotateCcw />,
            title: "Easy Returns",
            desc: "7-day seamless policy.",
        },
        {
            icon: <FiLock />,
            title: "Secure Pay",
            desc: "256-bit SSL encryption.",
        },
    ];

    return (
        <section className="py-20 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* Optional: Subtle Section Header */}
                <div className="text-center mb-12">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-rose-500 uppercase">
                        The Glow Standards
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8">
                    {signals.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center text-center px-4 transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Icon with Soft Glow Effect */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-rose-200 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                                <div className="relative z-10 w-14 h-14 flex items-center justify-center bg-white border border-slate-100 text-slate-800 rounded-2xl shadow-sm group-hover:border-rose-200 group-hover:text-rose-600 transition-all duration-500">
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                            </div>

                            {/* Text Content */}
                            <h4 className="text-sm font-bold text-slate-900 tracking-tight mb-2 uppercase">
                                {item.title}
                            </h4>

                            <div className="w-8 h-[2px] bg-slate-100 group-hover:w-12 group-hover:bg-rose-300 transition-all duration-500 mb-3" />

                            <p className="text-xs leading-relaxed text-slate-400 font-medium max-w-[140px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSignals;