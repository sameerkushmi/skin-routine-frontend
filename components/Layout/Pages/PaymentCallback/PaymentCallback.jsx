"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function PaymentVerificationContent() {
    const params = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState("Initializing secure verification...");

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const pidx = params.get("pidx");
                const orderId = params.get("purchase_order_id");
                const dataParam = params.get("data");

                // --- KHALTI VERIFY ---
                if (pidx && orderId) {
                    setStatus("Verifying Khalti transaction...");
                    const { data } = await api.post("/orders/khalti/verify", { pidx, orderId });

                    if (data.success) {
                        toast.success("Khalti Payment successful!");
                        return router.replace("/payment-success");
                    }
                    throw new Error("Khalti verification failed");
                }

                // --- ESEWA VERIFY ---
                if (dataParam) {
                    setStatus("Securing eSewa response...");
                    let esewaData;
                    try {
                        esewaData = JSON.parse(atob(dataParam));
                    } catch (err) {
                        throw new Error("Invalid eSewa payload");
                    }

                    const { data } = await api.post("/orders/esewa/verify", {
                        transaction_uuid: esewaData.transaction_uuid,
                        total_amount: esewaData.total_amount,
                        product_code: esewaData.product_code,
                    });

                    if (data.success) {
                        toast.success("eSewa Payment successful!");
                        return router.replace("/payment-success");
                    }
                    throw new Error("eSewa verification failed");
                }

                // --- NO PARAMS ---
                throw new Error("No transaction data found");

            } catch (error) {
                console.error("Verification error:", error?.response?.data || error.message);
                toast.error(error.message || "Verification failed");
                router.replace("/payment-failed");
            }
        };

        verifyPayment();
    }, [params, router]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 text-center border border-slate-100"
            >
                {/* Premium Animated Spinner */}
                <div className="relative flex justify-center mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                    </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Processing Payment
                </h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {status}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Bank-level Security
                    </span>
                </div>
            </motion.div>
        </div>
    );
}

// ✅ Wrapping in Suspense is mandatory for useSearchParams in Next.js 13+ client components
export default function PaymentCallback() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-pulse text-slate-400 font-medium">Loading...</div>
            </div>
        }>
            <PaymentVerificationContent />
        </Suspense>
    );
}