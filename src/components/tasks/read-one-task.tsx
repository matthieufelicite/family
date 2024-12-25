"use client"

import ValidateTaskButton from "./validate-task-button";
import { Badge } from "../ui/badge";
import ReverseTaskButton from "./reverse-task-button";
import { Card } from "../ui/card";
import { CustomTask } from "@/actions/history/read-histories";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import AvatarWithTooltip from "../utils/avatar-with-tooltip";

interface Props {

    task: CustomTask;
}

export default function ReadOneTask({ task }: Props) {

    const { data: session } = useSession();

    return (

        <Card className="flex flex-row justify-between items-center p-6">

            <div className="flex flex-col">

                <div className="flex items-center gap-3">

                    <h2 className="text-sm/6 font-semibold text-primary">{task.label}</h2>

                    <Badge variant="outline" className={task.status ? 'text-xs bg-green-500/10 text-green-700 border-green-500/20' : 'text-xs bg-red-500/10 text-red-700 border-red-500/20'}>{task.status ? 'Fait' : 'Non fait'}</Badge>
                </div>

                <p className="text-xs/5 text-gray-500">{task.description}</p>
            </div>

            <div className="flex items-center gap-6">

                <AvatarWithTooltip user={task.doneBy} />

                {task.status ? <ReverseTaskButton taskId={task.id} /> : <ValidateTaskButton id={task.id} />}

            </div>

        </Card >
    );
}