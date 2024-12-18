import { Card } from "../ui/card";
import ReadOneTask from "./read-one-task";
import { readTodayTasks } from "@/actions/history/read-today-tasks";

export default async function ReadAllTasks() {

    const tasks = await readTodayTasks();

    return (

        <div className="p-6 lg:px-8">

            {tasks.length === 0 ? (

                <p>Vous n'avez pas encore de tâches à suivre. Essayez d'en ajouter pour commencer.</p>
            ) : (

                <Card className="flex flex-col gap-4 p-4">

                    {tasks.map((task) => (

                        <ReadOneTask key={task.id} task={task} />
                    ))}
                </Card>
            )}
        </div>
    )
}
