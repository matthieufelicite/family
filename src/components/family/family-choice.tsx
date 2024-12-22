"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Family } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFamily } from "@/components/providers/family-provider";

interface Props {

    families: Family[];
}

export default function FamilyChoice({ families }: Props) {

    const familyContext = useFamily();

    const [open, setOpen] = React.useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Family | null>(null);
    const [isInitialSet, setIsInitialSet] = useState(false);

    // Set the initial family once when the component mounts
    useEffect(() => {
        if (!isInitialSet && families.length > 0) {
            const initialFamily = families[0];
            setSelectedTeam(initialFamily);
            familyContext.setFamily(initialFamily);
            setIsInitialSet(true); // Ensure this runs only once
        }
    }, [families, isInitialSet, familyContext]);

    // Handle family selection
    const handleSelect = (family: Family) => {
        setSelectedTeam(family);
        familyContext.setFamily(family);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Séléctionnez une famille"
                >
                    {selectedTeam
                        ? `Famille ${selectedTeam.name}`
                        : "Séléctionnez une famille"}
                    <ChevronsUpDown className="ml-auto opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Rechercher une famille" />
                    <CommandList>
                        <CommandEmpty>Pas de famille trouvée.</CommandEmpty>
                        <CommandGroup>
                            {families.map((family) => (
                                <CommandItem
                                    key={family.id}
                                    onSelect={() => handleSelect(family)}
                                    className="text-sm cursor-pointer"
                                >
                                    Famille {family.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedTeam &&
                                                selectedTeam.id === family.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}