"use server";

import { signIn } from "@/lib/auth";

interface Props {

    formData: FormData;
}

export default async function handleSignIn({ formData }: Props): Promise<void> {

    try {

        await signIn('resend', formData);
    }
    catch (error) {

        console.error("Erreur lors de la connexion : ", error);

        throw error;
    }
}