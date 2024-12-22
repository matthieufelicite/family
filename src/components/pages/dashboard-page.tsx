import Header from "@/components/utils/header";
import ReadAllTasks from "@/components/tasks/read-all-tasks";
import Heading from "@/components/utils/heading";
import { FamilyProvider } from "@/components/providers/family-provider";
import { DateProvider } from "../providers/date-provider";

export default function DashboardPage() {

    return (

        <FamilyProvider>

            <DateProvider>

                <Header />

                <Heading />

                <ReadAllTasks />

            </DateProvider>

        </FamilyProvider>
    );
}