import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {

	title: "family.",
	description: "Application de gestion des tâches familiales."
};

export default function RootLayout({ children }: PropsWithChildren) {

	return (

		<html lang="fr" suppressHydrationWarning>

			<body>

				<SessionProvider>

					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>

						{children}

					</ThemeProvider>

				</SessionProvider>

			</body>

		</html>
	);
}