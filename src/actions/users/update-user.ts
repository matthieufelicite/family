"use server"

import { prisma } from "@/lib/prisma"

interface Props {

    formData: FormData;
    userId: string;
}

export default async function updateUser({ formData, userId }: Props): Promise<void> {

    try {

        const name: string = formData.get('name') as string;

        const email: string = formData.get('email') as string;

        await prisma.user.update({

            where: {

                id: userId
            },
            data: {

                name: name,
                email: email,
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la création d'une famille : ", error);

        throw error;
    }
}