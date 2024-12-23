"use server"

import { prisma } from "@/lib/prisma"

interface Props {

    userId: string;
    taskId: string;
    date: Date;
}

export default async function createHistory({ userId, taskId, date }: Props): Promise<void> {

    date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

    try {

        await prisma.history.create({

            data: {

                taskId: taskId,
                userId: userId,
                completed: true,
                date: date
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la création de l'historique : ", error);

        throw error;
    }
}