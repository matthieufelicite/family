"use client"

import { handleSignIn } from "@/actions/authentication/signin";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData(e.currentTarget);

        try {

            await handleSignIn({ formData });
        }
        catch (error) {

            console.error("Failed to sign in:", error);
        }
    }

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
            <div className="flex-1 h-full w-full p-10 flex flex-col">

                <h1 className="relative z-20 flex items-center leading-tight text-lg font-semibold">

                    Connexion
                </h1>

                <form className="flex-1 flex flex-col justify-center items-center max-w-sm mx-auto gap-4" onSubmit={handleSubmit}>

                    <Input className="w-full" type="email" name="email" placeholder="Email" required />

                    <Button className="w-full" type="submit">{isLoading ? <Spinner /> : 'Se connecter'}</Button>

                    <p className="text-center text-sm text-muted-foreground">

                        En cliquant sur se connecter, vous adhérez à nos{" "}<Link href="/terms" className="underline underline-offset-4 hover:text-primary">conditions d’utilisation</Link>{" "}et notre{" "}<Link href="/privacy" className="underline underline-offset-4 hover:text-primary">politique de confidentialité</Link>.
                    </p>
                </form>
            </div>
        </div >
    );
}