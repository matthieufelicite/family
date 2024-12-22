"use server"

import { prisma } from "@/lib/prisma";

interface Props {

    taskId: string;
    date: Date;
}

export async function deleteHistory({ taskId, date }: Props): Promise<void> {

    const startOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

    const endOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

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