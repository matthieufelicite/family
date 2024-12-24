"use server"

import { prisma } from "@/lib/prisma"

interface Props {

    id: string;
}

export default async function deleteUser({ id }: Props): Promise<void> {

    try {

        await prisma.user.delete({

            where: {

                id: id
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la suppression de l'utilisateur : ", error);

        throw error;
    }
}