import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Heading from "@/components/heading";
import ReadAllTasks from "@/components/tasks/read-all-tasks";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {

	title: "Authentication",
	description: "Authentication forms built using the components.",
}

export default async function Page() {

	const session = await auth();

	if (!session?.user) redirect('/login')

	return (

		<>
			<Header />

			<Heading />

			<SessionProvider>

				<ReadAllTasks />
			</SessionProvider>
		</>
	);
}
