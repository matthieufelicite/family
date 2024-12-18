"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const teams = [

    {
        label: "Famille FELICITE",
        value: "felicite",
    }
]

type Team = {

    label: string;
    value: string;
}

export default function FamilyChoice() {

    const [open, setOpen] = React.useState(false)

    const [selectedTeam, setSelectedTeam] = React.useState<Team>(
        teams[0]
    )

    return (

        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild>

                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a team"
                >
                    {selectedTeam.label}
                    <ChevronsUpDown className="ml-auto opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Rechercher une famille" />
                    <CommandList>
                        <CommandEmpty>No team found.</CommandEmpty>
                        <CommandGroup>
                            {teams.map((team) => (

                                <CommandItem
                                    key={team.value}
                                    onSelect={() => {
                                        setSelectedTeam(team)
                                        setOpen(false)
                                    }}
                                    className="text-sm"
                                >
                                    {team.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedTeam.value === team.value
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
    )
}