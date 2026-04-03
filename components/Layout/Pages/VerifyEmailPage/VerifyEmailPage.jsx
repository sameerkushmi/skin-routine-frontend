"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/components/utils/Api/api";
import LoadingState from "./LoadingState/LoadingState";
import ErrorState from "./ErrorState/ErrorState";
import SuccessState from "./SuccessState/SuccessState";
import { useMyContext } from "@/components/utils/Context/Context";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [status, setStatus] = useState("loading");
    const {fetchUser} = useMyContext()

    useEffect(() => {
        if (!token) {
            setStatus("error");
            return;
        }

        const verify = async () => {
            try {
                await api.get(`/auth/verify-email?token=${token}`)
                fetchUser()
                setStatus("success");
            } catch (error) {
                console.log("verify email : ", error);
                setStatus("error");
            }
        };

        verify();
    }, [token]);

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden flex items-center justify-center px-4">

            {/* Ambient Glow */}
            <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-gradient-to-br from-pink-100/40 to-transparent blur-[140px] rounded-full" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] bg-gradient-to-tl from-slate-200/50 to-transparent blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >

                {/* LOADING STATE */}
                {status === "loading" && (
                    <LoadingState />
                )}

                {/* SUCCESS STATE */}
                {status === "success" && (
                    <SuccessState />
                )}

                {/* ERROR STATE */}
                {status === "error" && (
                    <ErrorState />
                )}
            </motion.div>
        </div>
    );
}