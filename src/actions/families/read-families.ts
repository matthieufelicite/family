"use server"

import { prisma } from "@/lib/prisma"
import { Family } from "@prisma/client";

interface Props {

    userId: string;
}

export default async function readFamilies({ userId }: Props): Promise<Family[]> {

    try {

        return await prisma.family.findMany({

            where: {

                users: {

                    some: {

                        id: userId
                    }
                }
            }
        });
    }
    catch (error) {

        console.error("Erreur lors de la lecture des familles : ", error);

        throw error;
    }
}