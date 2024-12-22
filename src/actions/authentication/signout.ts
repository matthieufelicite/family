"use server";

import { signOut } from "@/lib/auth";

export default async function handleSignOut(): Promise<void> {

    try {

        await signOut({

            redirectTo: '/login'
        });
    }
    catch (error) {

        console.error("Erreur lors de la déconnexion : ", error);

        throw error;
    }
}