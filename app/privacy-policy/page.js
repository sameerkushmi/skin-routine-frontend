import PrivacyPolicyPage from "@/components/Layout/Pages/PrivacyPolicyPage/PrivacyPolicyPage";

export const metadata = {
    title: "Privacy Policy | SkinRoutine",
    description:
        "Learn how SkinRoutine collects, uses, and protects your personal information.",
};

const page = () => {
    return (
        <div>
            <PrivacyPolicyPage />
        </div>
    )
}

export default page