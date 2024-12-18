import { CreateTaskButton } from "@/components/tasks/create-task-button";


export default function Heading() {

    const date: Date = new Date();

    const dateString = date.toLocaleDateString("fr-FR", {

        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    return (

        <div className="flex items-center justify-between p-6 lg:px-8">

            <div className="flex flex-col">

                <h2 className="text-3xl font-bold tracking-tight">Tabeau de bord</h2>

                <p className="text-xs/5 text-gray-500">{dateString}</p>
            </div>

            <CreateTaskButton />
        </div>
    );
}