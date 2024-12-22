"use server"

import { prisma } from "@/lib/prisma"
import { Task } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";

export type CustomTask = Task & {

    status: boolean,
    doneBy: string
}

interface Props {

    date: Date;
    familyId: string;
}

export default async function readHistories({ date, familyId }: Props): Promise<CustomTask[]> {

    const startOfTheDay = startOfDay(date);

    const endOfTheDay = endOfDay(date);

    const tasks = await prisma.task.findMany({

        include: {

            histories: {

                include: {

                    user: true
                },

                where: {

                    date: {

                        gte: startOfTheDay,
                        lte: endOfTheDay,
                    },
                },
                orderBy: {

                    date: 'desc',
                }
            },
            family: {

                where: {

                    id: familyId
                }
            }
        },

        where: {

            familyId: familyId
        }
    });

    const customTasks = tasks.map((task) => {

        const status = task.histories.length > 0;

        const doneBy = task.histories.length > 0 ? task.histories[0]?.user?.email : "";

        return {

            ...task,
            status: status,
            doneBy: doneBy
        };
    });

    return customTasks;
}