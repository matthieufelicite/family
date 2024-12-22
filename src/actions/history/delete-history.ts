"use server"

import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

interface Props {

    taskId: string;
    date: Date;
}

export default async function deleteHistory({ taskId, date }: Props): Promise<void> {

    try {

        const startOfTheDay = startOfDay(date);

        const endOfTheDay = endOfDay(date);

        await prisma.history.deleteMany({

            where: {

                date: {

                    gte: startOfTheDay,
                    lte: endOfTheDay
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