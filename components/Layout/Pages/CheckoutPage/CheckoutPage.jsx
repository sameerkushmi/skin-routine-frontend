"use client";

import { useEffect, useState } from "react";
import { useMyContext } from "@/components/utils/Context/Context";
import { useRouter } from "next/navigation";
import api from "@/components/utils/Api/api";
import toast from "react-hot-toast";
import InformationFlow from "./InformationFlow/InformationFlow";
import OrderSummary from "./OrderSummary/OrderSummary";

export default function CheckoutPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const { checkoutItems, user } = useMyContext();

    const [form, setForm] = useState({
        email: '',
        phone: '',
        fullName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });

    // Pre-fill default address
    useEffect(() => {
        if (user) {
            const defaultAddress = user.addresses?.find(addr => addr.isDefault) || {};
            setForm({
                email: user.email || '',
                phone: defaultAddress.phone || user.phone || '',
                fullName: user.name || '',
                address: defaultAddress.street || '',
                city: defaultAddress.city || '',
                state: defaultAddress.state || '',
                zip: defaultAddress.postalCode || '',
                country: defaultAddress.country || 'Nepal'
            });
        }
    }, [user]);

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const cartItems = checkoutItems;

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = 100;
    const total = subtotal + shipping;

    // Payment options
    const paymentOptions = [
        { id: "fonepay", label: "Fonepay", icon: "/images/payment logo/fonepay.jpg" },
        { id: "esewa", label: "eSewa", icon: "https://esewa.com.np/common/images/esewa_logo.png" },
        { id: "khalti", label: "Khalti", icon: "https://imgs.search.brave.com/I7D4hZUCOVdlv7H1Sar7icvymAX-2BJ0TBBo_rf4nhY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzQ2My00/NjM5NzA5X2toYWx0/aS1kaWdpdGFsLXdh/bGxldC1sb2dvLXNp/Z24taGQtcG5nLWRv/d25sb2FkLnBuZw" },
        { id: "cod", label: "Cash on Delivery", sub: "Pay at your doorstep" },
    ];

    // Redirect if cart empty
    useEffect(() => {
        if (!checkoutItems.length) router.push("/account/carts");
    }, [checkoutItems]);

    // Validate form
    const validateForm = () => {
        const requiredFields = [
            "email",
            "phone",
            "fullName",
            "address",
            "city",
            "state",
            "zip",
            "country"
        ];

        for (let field of requiredFields) {
            if (!form[field]?.trim()) {
                toast.error(`${field} is required`);
                return false;
            }
        }

        return true;
    };

    // 🔥 Common mapped data (clean)
    const mappedCartItems = cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price
    }));

    const mappedAddress = {
        phone: form.phone,
        street: form.address,
        city: form.city,
        state: form.state,
        postalCode: form.zip,
        country: form.country
    };

    // =========================
    // 💳 PAYMENT HANDLERS
    // =========================

    const handleEsewa = async () => {
        const { data } = await api.post("/orders/esewa", {
            cartItems: mappedCartItems,
            address: mappedAddress
        });

        if (!data.success) {
            toast.error("Failed to create eSewa payment");
            return;
        }

        const payment = data.payment;

        const esewaForm = document.createElement("form");
        esewaForm.method = payment.method;
        esewaForm.action = payment.url;

        Object.entries(payment.params).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            esewaForm.appendChild(input);
        });

        document.body.appendChild(esewaForm);
        esewaForm.submit();
    };

    const handleKhalti = async () => {
        const { data } = await api.post("/orders/khalti", {
            cartItems: mappedCartItems,
            address: mappedAddress
        });

        if (!data.success) {
            toast.error("Failed to create Khalti payment");
            return;
        }

        window.location.href = data.payment_url;
    };

    const handleFonepay = async () => {
        const { data } = await api.post("/orders/fonepay", {
            cartItems: mappedCartItems,
            address: mappedAddress
        });

        if (!data.success) {
            toast.error("Failed to create Fonepay payment");
            return;
        }

        window.location.href = data.paymentUrl;
    };

    const handleCOD = async () => {
        await api.post("/orders/cod", {
            paymentMethod: "cod",
            cartItems: mappedCartItems,
            address: mappedAddress
        });

        toast.success("Order placed successfully!");
        router.push("/account/orders");
    };

    // 🔥 Handler map (scalable)
    const paymentHandlers = {
        esewa: handleEsewa,
        khalti: handleKhalti,
        fonepay: handleFonepay,
        cod: handleCOD
    };

    // =========================
    // 🛒 CHECKOUT
    // =========================

    const handleCheckout = async () => {
        if (!validateForm()) return;

        try {
            const handler = paymentHandlers[paymentMethod];

            if (!handler) {
                toast.error("Invalid payment method");
                return;
            }

            await handler();

        } catch (err) {
            console.error(err?.response?.data || err.message);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="bg-[#FCFBFA] min-h-screen py-12 md:py-20 px-4 md:px-10 lg:px-24">
            <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 gap-16 items-start">

                {/* LEFT */}
                <InformationFlow
                    form={form}
                    handleChange={handleChange}
                    total={total}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    handleCheckout={handleCheckout}
                    paymentOptions={paymentOptions}
                />

                {/* RIGHT */}
                <OrderSummary
                    cartItems={cartItems}
                    subtotal={subtotal}
                    shipping={shipping}
                    total={total}
                />

            </div>
        </section>
    );
}