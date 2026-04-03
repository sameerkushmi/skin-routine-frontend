import AboutPage from "@/components/Layout/Pages/AboutPage/AboutPage";
import Script from "next/script";

export const metadata = {
    title: "About Us | Clean & Luxury Skincare Brand",
    description:
        "Learn about our journey, mission, values, team, and commitment to clean, luxurious skincare. Ethical sourcing, transparency, and sustainability at our core.",

    keywords: [
        "about skincare brand",
        "clean skincare",
        "luxury skincare",
        "organic skincare",
        "cruelty-free beauty",
        "sustainable skincare",
        "ethical beauty brand",
        "dermatologist tested skincare",
    ],

    authors: [{ name: "Your Brand Name" }],
    robots: "index, follow",

    openGraph: {
        title: "About Our Clean & Luxury Skincare Brand",
        description:
            "Discover our story, values, team, and the philosophy behind our clean, ethical, and luxurious skincare products.",
        url: "https://yourwebsite.com/about",
        siteName: "Your Brand Name",
        images: [
            {
                url: "https://yourwebsite.com/og-about.jpg",
                width: 1200,
                height: 630,
                alt: "About our skincare brand",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "About Our Skincare Brand",
        description:
            "From clean ingredients to ethical sourcing — learn what makes our skincare brand trusted worldwide.",
        images: ["https://yourwebsite.com/og-about.jpg"],
    },

    alternates: {
        canonical: "https://yourwebsite.com/about",
    },

};

export const viewport = {
  themeColor: "#fff",
};

const Page = () => {
    return (
        <div>
            <AboutPage />
            <Script
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
                    }),
                }}
            />

        </div>
    );
};

export default Page;
