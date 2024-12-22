"use client"

import { createTask } from "@/actions/tasks/create-task"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { useFamily } from "../providers/family-provider"

interface Props {

    className?: string;
}

export default function CreateTaskButton({ className }: Props) {

    const familyContext = useFamily();

    const [open, setOpen] = useState(false)

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        await createTask({ formData: formData, familyId: familyContext.family?.id })

        router.refresh()

        setOpen(false)
    }

    return (

        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild className={className}>

                <Button variant='default'>Créer une tâche</Button>
            </DialogTrigger>


            <DialogContent className="sm:max-w-[425px]">

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                    <DialogHeader>

                        <DialogTitle>Créer une tâche</DialogTitle>

                        <DialogDescription>Veuillez renseigner les champs ci-dessous pour créer une nouvelle tâche.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">

                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="label" className="text-right">Label</Label>

                            <Input id="label" name="label" className="col-span-3" required />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="description" className="text-right">Description</Label>

                            <Input id="description" name="description" className="col-span-3" required />
                        </div>
                    </div>

                    <DialogFooter>

                        <Button type="submit">Créer une tâche</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
