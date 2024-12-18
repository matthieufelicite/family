"use server"

import { prisma } from "@/lib/prisma";

interface Props {

    taskId: string;
}

export async function deleteHistory({ taskId }: Props): Promise<void> {

    const today = new Date();

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    try {

        await prisma.history.deleteMany({

            where: {

                date: {

                    gte: startOfToday,
                    lte: endOfToday
                },
                taskId: taskId
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la suppression de l'historique : ", error);

        throw error;
    }
}