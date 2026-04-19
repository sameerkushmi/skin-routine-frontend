import Newsletter from "@/components/Newsletter/Newsletter"
import AboutHero from "./AboutHero/AboutHero"
import AwardsAndCertifications from "./AwardsAndCertifications/AwardsAndCertifications"
import BrandStory from "./BrandStory/BrandStory"
import CoreValues from "./CoreValues/CoreValues"
import MissionVision from "./MissionVision/MissionVision"
import Testimonials from "./Testimonials/Testimonials"

const AboutPage = () => {
    return (
        <div>
            <AboutHero />
            <BrandStory />
            <MissionVision />
            <CoreValues />
            {/* <AwardsAndCertifications /> */}
            <Testimonials />
            <Newsletter />
        </div>
    )
}

export default AboutPage