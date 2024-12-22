import ValidateTaskButton from "./validate-task-button";
import { Badge } from "../ui/badge";
import ReverseTaskButton from "./reverse-task-button";
import { TaskWithStatus } from "@/actions/history/read-today-tasks";
import { Card } from "../ui/card";

interface Props {

    task: TaskWithStatus;
}

export default function ReadOneTask({ task }: Props) {

    return (

        <Card className="flex flex-row justify-between items-center p-6">

            <div className="flex flex-col">

                <div className="flex items-center gap-3">

                    <h2 className="text-sm/6 font-semibold text-primary">{task.label}</h2>

                    <Badge variant="outline" className={task.status ? 'text-xs bg-green-500/10 text-green-700 border-green-500/20' : 'text-xs bg-red-500/10 text-red-700 border-red-500/20'}>{task.status ? 'Fait' : 'À faire'}</Badge>
                </div>

                <p className="text-xs/5 text-gray-500">{task.description}</p>
            </div>

            {task.doneBy}

            {task.status ? <ReverseTaskButton taskId={task.id} /> : <ValidateTaskButton id={task.id} />}
        </Card>
    );
}