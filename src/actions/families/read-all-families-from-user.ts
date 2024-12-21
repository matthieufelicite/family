"use server"

import { prisma } from "@/lib/prisma"

interface Props {

    id: string;
}

export async function readAllFamiliesFromUser({ id }: Props) {

    return await prisma.family.findMany({

        where: {

            users: {

                some: {

                    id: id
                }
            }
        }
    });
}