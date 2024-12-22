"use server"

import { prisma } from "@/lib/prisma"
import { Task } from "@prisma/client";

export default async function readTasks(): Promise<Task[]> {

    try {

        return await prisma.task.findMany();
    }
    catch (error) {

        console.error("Erreur lors de la lecture des tâches : ", error);

        throw error;
    }
}