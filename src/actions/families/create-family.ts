"use server"

import { prisma } from "@/lib/prisma"
import { Family } from "@prisma/client";

interface Props {

    formData: FormData;
    userId: string;
}

export default async function createFamily({ formData, userId }: Props): Promise<Family> {

    try {

        const name: string = formData.get('name') as string;

        return await prisma.family.create({

            data: {

                name: name,

                users: {

                    connect: {

                        id: userId
                    }
                }
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la création d'une famille : ", error);

        throw error;
    }
}