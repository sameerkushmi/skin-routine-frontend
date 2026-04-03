import SiteMapPage from "@/components/Layout/Pages/SiteMapPage/SiteMapPage";

export const metadata = {
    title: "Sitemap | SkinRoutine",
    description: "Navigate through all pages of SkinRoutine. Find all links to products, policies, and information pages.",
};

const page = () => {
    return (
        <div>
            <SiteMapPage />
        </div>
    )
}

export default page