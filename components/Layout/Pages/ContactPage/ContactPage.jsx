import ContactCTA from "./ContactCTA/ContactCTA"
import ContactFormSection from "./ContactFormSection/ContactFormSection"
import ContactHero from "./ContactHero/ContactHero"
import ContactInfoSection from "./ContactInfoSection/ContactInfoSection"
import FAQPreview from "./FAQPreview/FAQPreview"
import QuickSupportCards from "./QuickSupportCards/QuickSupportCards"
import StoreLocation from "./StoreLocation/StoreLocation"
import TrustStrip from "./TrustStrip/TrustStrip"

const ContactPage = () => {
    return (
        <div>
            <ContactHero />
            <ContactFormSection />
            <ContactInfoSection />
            <QuickSupportCards />
            <StoreLocation />
            <FAQPreview />
            <ContactCTA />
            <TrustStrip />
        </div>
    )
}

export default ContactPage