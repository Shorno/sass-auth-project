import CardWrapper from "@/components/auth/card-wrapper";

export default function LoginForm() {
    return (
        <>
            <CardWrapper
                headerLabel={"Welcome to Auth Service"}
                backButtonLabel={"Don't have an account?"}
                backButtonHref={"/auth/register"}
                showSocial
            >
                login form
            </CardWrapper>
        </>
    )
}
