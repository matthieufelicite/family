"use server"

import { prisma } from "@/lib/prisma"

export async function readAllFamilies() {

    return await prisma.family.findMany();
}