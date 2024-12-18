"use client"

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormEvent, ReactElement } from "react";
import { deleteHistory } from "@/actions/history/delete-history";

interface Props {

    taskId: string;
}

export default function ReverseTaskButton({ taskId }: Props): ReactElement {

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        await deleteHistory({ taskId });

        router.refresh();
    }

    return (

        <form onSubmit={handleSubmit}>

            <Button variant="outline" size="icon">

                <XIcon />
            </Button>
        </form>
    );
}