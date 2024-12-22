"use server"

import { prisma } from "@/lib/prisma"
import { Task } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";

interface Props {

    date: Date;
}

export type TaskWithStatus = Task & {

    status: boolean,
    doneBy: string
}

export async function readTodayTasksWithDate({ date }: Props): Promise<TaskWithStatus[]> {

    const startOfToday = startOfDay(date)

    const endOfToday = endOfDay(date)

    const tasks = await prisma.task.findMany({

        include: {

            histories: {

                include: {

                    user: true
                },

                where: {

                    date: {

                        gte: startOfToday,
                        lte: endOfToday,
                    },
                },
                orderBy: {

                    date: 'desc',
                }
            }
        }
    });

    const tasksWithStatus = tasks.map((task) => {

        const statusToday = task.histories.length > 0;

        const doneBy = task.histories.length > 0
            ? task.histories[0]?.user?.email || ""
            : "";

        return {

            ...task,
            status: statusToday,
            doneBy: doneBy
        };
    });

    return tasksWithStatus;
}