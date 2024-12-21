"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Family } from "@prisma/client"
import { useState } from "react"

interface Props {

    families: Family[];
}

export default function FamilyChoice({ families }: Props) {

    const [open, setOpen] = React.useState(false)

    const [selectedTeam, setSelectedTeam] = useState<Family | null>(families.length > 0 ? families[0] : null)

    return (

        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild>

                <Button variant="outline" role="combobox" aria-expanded={open} aria-label="Séléctionnez une famille">

                    {selectedTeam ? `Famille ${selectedTeam.name}` : "Séléctionnez une famille"}

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

                                <CommandItem key={family.name} onSelect={() => { setSelectedTeam(family); setOpen(false) }} className="text-sm cursor-pointer">

                                    Famille {family.name}

                                    <Check className={cn(

                                        "ml-auto",
                                        selectedTeam && selectedTeam.name === family.name
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