import { auth } from "@/lib/auth";
import DashboardPage from "@/components/pages/dashboard";
import Login from "@/components/pages/login";

export default async function Page() {

	const session = await auth();

	if (!session?.user) {

		return <Login />;
	}

	return <DashboardPage />;
}
