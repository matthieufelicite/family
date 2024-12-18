"use server"

import { cn } from "@/lib/utils";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Family } from "@prisma/client";
import { readAllFamilies } from "@/actions/families/read-all-families";

interface Props {

    selectedFamily: Family | null;
    onFamilySelect: (family: Family) => void;
}

export default async function ReadFamilyList({ selectedFamily, onFamilySelect }: Props) {

    const families: Family[] = await readAllFamilies()

    return (

        <CommandGroup>

            {families.map((family) => (

                <CommandItem key={family.id} onSelect={() => { onFamilySelect(family) }} className="text-sm">

                    {family.name}

                    <Check
                        className={cn(
                            "ml-auto",
                            selectedFamily?.name === family.name
                                ? "opacity-100"
                                : "opacity-0"
                        )}
                    />
                </CommandItem>
            ))}
        </CommandGroup>
    );
}