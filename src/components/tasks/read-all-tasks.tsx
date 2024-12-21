import ReadOneTask from "./read-one-task";
import { readTodayTasks, TaskWithStatus } from "@/actions/history/read-today-tasks";

export default async function ReadAllTasks() {

    const tasks: TaskWithStatus[] = await readTodayTasks();

    return (

        <div className="flex flex-col gap-6 p-6">

            {tasks.map((task) => (

                <ReadOneTask key={task.id} task={task} />
            ))}

        </div>
    );
};