"use server"

import { prisma } from "@/lib/prisma"

interface Props {

    id: string;
}

export async function deleteTask({ id }: Props): Promise<void> {

    try {

        await prisma.task.delete({

            where: {

                id: id
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la suppression de l'habitude : ", error);

        throw error;
    }
}