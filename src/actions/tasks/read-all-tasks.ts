"use server"

import { prisma } from "@/lib/prisma"
import { Task } from "@prisma/client";

export async function readAllTasks(): Promise<Task[]> {

    return await prisma.task.findMany();
}