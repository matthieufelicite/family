"use server"

import { prisma } from "@/lib/prisma"

interface Props {

    formData: FormData;
    familyId: string | undefined;
}

export async function createTask({ formData, familyId }: Props): Promise<void> {

    try {

        const label: string = formData.get('label') as string;
        const description: string = formData.get('description') as string;

        await prisma.task.create({

            data: {

                label: label,
                description: description,
                familyId: familyId
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la création de la tâche : ", error);

        throw error;
    }
}