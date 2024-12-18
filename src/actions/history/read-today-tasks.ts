"use server"

import { prisma } from "@/lib/prisma"
import { Task } from "@prisma/client";

export type TaskWithStatus = Task & {

    status: boolean;
}

export async function readTodayTasks(): Promise<TaskWithStatus[]> {

    const today = new Date();

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

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