import CreateTaskButton from "@/components/tasks/create-task-button";
import DatePicker from "@/components/utils/date-picker";


export default function Heading() {

    return (

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 border-b">

            <h2 className="text-3xl font-bold tracking-tight">Tabeau de bord</h2>

            <div className="flex items-center gap-6 w-full lg:w-auto">

                <DatePicker className="flex-1 lg:flex-none" />

                <CreateTaskButton className="flex-1 lg:flex-none" />
            </div>
        </div>
    );
}