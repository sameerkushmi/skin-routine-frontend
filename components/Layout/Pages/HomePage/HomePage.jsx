import BlogSection from "./BlogSection/BlogSection"
import FeaturedCategories from "./FeaturedCategories/FeaturedCategories"
import HeroSection from "./HeroSection/HeroSection"
import Newsletter from "../../../Newsletter/Newsletter"
import Testimonials from "./Testimonials/Testimonials"
import TrendingProducts from "./TrendingProducts/TrendingProducts"
import PremiumOffers from "./PremiumOffers/PremiumOffers"
import NewArrivals from "./NewArrivals/NewArrivals"
import OfferBanner from "./OfferBanner/OfferBanner"
import BrandSlider from "./BrandSlider/BrandSlider"

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedCategories />
            <TrendingProducts />
            <OfferBanner />
            <NewArrivals />
            <BrandSlider />
            <PremiumOffers />
            <Testimonials />
            <BlogSection />
            <Newsletter />
        </div>
    )
}

export default HomePage