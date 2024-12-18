"use server";

import { signIn } from "@/lib/auth";

interface Props {

    formData: FormData;
}

export async function handleSignIn({ formData }: Props) {

    await signIn('resend', formData);
}