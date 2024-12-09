import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function FamilyChoicePage() {

    const session = await auth();

    const families = await prisma.family.findMany();

    return (

        <div className="h-screen flex flex-row items-center justify-center">

            {/* LEFT SIDE */}

            <div className="flex-1 h-full relative hidden flex-col bg-muted dark:border-r lg:flex p-10">

                <div className="absolute inset-0 bg-zinc-900" />

                <div className="relative z-20 flex items-center text-white leading-tight text-lg font-semibold">

                    family.
                </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="flex-1 h-full w-full p-10 flex flex-col">

                <div className="flex flex-row justify-between">

                    <div>

                        <h1 className="text-2xl font-semibold tracking-tight">Rejoindre une famille</h1>

                        <p className="text-sm text-muted-foreground">Séléctionnez une famille à rejoiondre dans la liste ci-dessous.</p>
                    </div>
                </div>

                <Table>

                    <TableBody>

                        {families.map((family) => (

                            <TableRow key={family.family}>

                                <TableCell className="font-medium">{family.name}</TableCell>

                                <TableCell><form action={async (formData) => {

                                    "use server"

                                    await prisma.user.update({

                                        where: {

                                            id: session?.user?.id
                                        },
                                        data: {

                                            familyId: family.id
                                        }
                                    })
                                }}><Button type="submit">Rejoindre</Button></form></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
}