"use server"

import { prisma } from "@/lib/prisma"

export async function createFamily(formData: FormData) {

    const label = formData.get('label') as string;
    const description = formData.get('description') as string;

    await prisma.task.create({

        data: {

            label,
            description
        }
    });
}