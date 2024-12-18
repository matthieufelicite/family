"use server"

import { prisma } from "@/lib/prisma"

interface Props {

    userId: string;
    taskId: string;
    value: boolean
}

export async function createHistory({ userId, taskId, value }: Props): Promise<void> {

    try {

        await prisma.history.create({

            data: {

                taskId: taskId,
                userId: userId,
                completed: value
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la création de l'historique : ", error);

        throw error;
    }
}