import ContactPage from "@/components/Layout/Pages/ContactPage/ContactPage";

export const metadata = {
    title: "Contact Us | Clean & Luxury Skincare Brand",
    description:
        "Get in touch with our clean & luxury skincare brand. Reach us via email, phone, WhatsApp, or visit our store. Fast support, expert advice, and easy consultation.",
    keywords: [
        "contact skincare brand",
        "skincare support",
        "clean skincare contact",
        "luxury skincare help",
        "customer care skincare",
        "skincare consultation",
        "order inquiry",
        "returns and shipping",
    ],
    authors: [{ name: "Skin Routine" }],
    robots: "index, follow",
    openGraph: {
        title: "Contact Our Clean & Luxury Skincare Brand",
        description:
            "Reach out to us via email, phone, WhatsApp, or visit our store. Fast support and expert skincare guidance.",
        url: "https://yourwebsite.com/contact",
        siteName: "Skin Routine",
        images: [
            {
                url: "https://yourwebsite.com/og-contact.jpg",
                width: 1200,
                height: 630,
                alt: "Contact our skincare brand",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Our Skincare Brand",
        description:
            "From order inquiries to consultations — get in touch with our clean & luxury skincare brand today.",
        images: ["https://yourwebsite.com/og-contact.jpg"],
    },
    alternates: {
        canonical: "https://yourwebsite.com/contact",
    },
};

export const viewport = {
    themeColor: "#fff",
};

const Page = () => {
    return (
        <div>
            <ContactPage />
            {/* Structured Data for Organization */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "Your Brand Name",
                        url: "https://yourwebsite.com",
                        logo: "https://yourwebsite.com/logo.png",
                        sameAs: [
                            "https://www.instagram.com/yourbrand",
                            "https://www.facebook.com/yourbrand",
                        ],
                        contactPoint: [
                            {
                                "@type": "ContactPoint",
                                telephone: process.env.NEXT_PUBLIC_NUMBER,
                                contactType: "customer support",
                                email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
                                availableLanguage: ["English"],
                            },
                        ],
                    }),
                }}
            />
        </div>
    );
};

export default Page;
