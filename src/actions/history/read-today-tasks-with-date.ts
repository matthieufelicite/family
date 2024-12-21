"use server"

import { prisma } from "@/lib/prisma"
import { Task } from "@prisma/client";

interface Props {

    date: Date;
}

export type TaskWithStatus = Task & {

    status: boolean;
}

export async function readTodayTasksWithDate({ date }: Props): Promise<TaskWithStatus[]> {

    const startOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

    const endOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    const tasks = await prisma.task.findMany({

        include: {

            histories: {

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

        return {

            ...task,
            status: statusToday
        };
    });

    return tasksWithStatus;
}