import { auth } from "@/lib/auth";
import DashboardPage from "@/components/pages/dashboard-page";
import Login from "@/components/pages/login-page";

export default async function Page() {

	const session = await auth();

	if (!session?.user) {

		return <Login />;
	}

	return <DashboardPage />;
}
