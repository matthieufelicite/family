"use client"

import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createHistory } from "@/actions/history/create-history";
import { useSession } from "next-auth/react";
import { FormEvent, ReactElement } from "react";

interface Props {

    id: string;
}

export default function ValidateTaskButton({ id }: Props): ReactElement {

    const router = useRouter();

    const { data: session } = useSession();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        if (!session) return;

        event.preventDefault();

        await createHistory({ userId: session.user.id, taskId: id, value: true });

        router.refresh();
    }

    return (

        <form onSubmit={handleSubmit}>

            <Button variant="outline" size="icon">

                <CheckIcon />
            </Button>
        </form>
    );
}