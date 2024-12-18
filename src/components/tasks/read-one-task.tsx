import ValidateTaskButton from "./validate-task-button";
import { Badge } from "../ui/badge";
import ReverseTaskButton from "./reverse-task-button";
import { TaskWithStatus } from "@/actions/history/read-today-tasks";

interface Props {

    task: TaskWithStatus;
}

export default function ReadOneTask({ task }: Props) {

    return (

        <div className="flex flex-row justify-between items-center">

            <div className="flex flex-col">

                <div className="flex items-center gap-4">

                    <h2 className="text-sm/6 font-semibold text-gray-900">{task.label}</h2>

                    <Badge variant="outline" className={task.status ? 'text-xs bg-green-50 text-green-700 border-green-200' : 'text-xs bg-red-50 text-red-700 border-red-200'}>{task.status ? 'fait' : 'non fait'}</Badge>
                </div>

                <p className="text-xs/5 text-gray-500">{task.description}</p>
            </div>

            {task.status ? <ReverseTaskButton taskId={task.id} /> : <ValidateTaskButton id={task.id} />}
        </div>
    );
}