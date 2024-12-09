import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {

	title: "family.",
	description: "Application de gestion des tâches familiales.",
};

export default function RootLayout({ children }: PropsWithChildren) {

	return (

		<html lang="fr">

			<body>

				{children}
			</body>
		</html>
	);
}
