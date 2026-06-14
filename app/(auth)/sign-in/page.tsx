import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldSet } from "@/components/ui/field"
import { GithubSignInForm } from "@/features/auth/components/github-sign-in-form"
import { Metadata } from "next"
import Image from "next/image"


export const metadata: Metadata = {
    title:"Sign in",
    description:"Sign in to Inspectra with your Github account."
}

type SignInPageProps = {
    searchParams: Promise<{callbackUrl?: string}>
}

const SignInPage = async ({searchParams}:SignInPageProps) => {
    const {callbackUrl} = await searchParams
  return (
    <div>
        <Card className="border-border/80 shadow-sm">
            <CardHeader className="text-center items-center">
                <div className="mb-6 flex justify-center pt-2">
                    <Image 
                        src={"./inspectra.svg"}
                        alt="Inspectra"
                        width={50}
                        height={50}
                        priority
                        className="text-foreground"
                    />
                </div>
                <CardTitle className="text-base mt-4">Welcome Developer</CardTitle>
                <CardDescription>
                    Sign in with Github to review and manage your code.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <GithubSignInForm callbackUrl={callbackUrl}/>
                            <FieldDescription className="text-center text-xs">
                                We only request the permissions needed to identify your account. You can revoke access anytime from Github settings.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </CardContent>
        </Card>
    </div>
  )
}

export default SignInPage