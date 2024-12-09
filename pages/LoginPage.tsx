import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {

    return (

        <div className="h-screen flex flex-row items-center justify-center">

            {/* LEFT SIDE */}

            <div className="flex-1 h-full relative hidden flex-col bg-muted dark:border-r lg:flex p-10">

                <div className="absolute inset-0 bg-zinc-900" />

                <div className="relative z-20 flex items-center text-white leading-tight text-lg font-semibold">

                    family.
                </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="flex-1 h-full w-full p-10 flex flex-col gap-4">

                <div className="flex flex-col space-y-2 text-center">

                    <h1 className="text-2xl font-semibold tracking-tight">Connexion</h1>

                    <p className="text-sm text-muted-foreground">Veuillez saisir votre email ci-dessous pour vous connecter.</p>
                </div>

                <form className="flex flex-col gap-4" action={async (formData) => {

                    "use server"

                    await signIn("resend", formData)
                }}
                >

                    <Input type="text" name="email" placeholder="matthieu.felicite@gmail.com" />

                    <Button type="submit">Se connceter</Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">

                    En cliquant sur se connecter, vous adhérez à nos{" "}<Link href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</Link>{" "}et{" "}<Link href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}