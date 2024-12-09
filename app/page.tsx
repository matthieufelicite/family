import { Metadata } from "next";
import { auth } from "@/lib/auth";
import LoginPage from "@/pages/LoginPage";
import FamilyChoicePage from "@/pages/FamilyChoicePage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export const metadata: Metadata = {

	title: "Authentication",
	description: "Authentication forms built using the components.",
}

export default async function Page() {

	const session = await auth();

	if (!session?.user) return <LoginPage />

	if (session?.user && !session.user.familyId) return <FamilyChoicePage />

	return (

		<Header />
	);
}