"use client"

import readFamilies from "@/actions/families/read-families";
import { Family } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import createFamily from "@/actions/families/create-family";
import { useRouter } from "next/navigation";
import { useFamily } from "../providers/family-provider";

export default function ReadFamilies() {

    const router = useRouter();

    const familyContext = useFamily();

    const { data: session } = useSession();

    const [families, setFamilies] = useState<Family[]>([]);

    const [open, setOpen] = useState<boolean>(false);

    const [selectedFamily, setSelectedFamily] = useState<Family>();

    const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

    useEffect(() => {

        async function loadFamilies() {

            if (!session) return;

            const loadedFamilies = await readFamilies({ userId: session?.user.id });

            setFamilies(loadedFamilies);

            if (loadedFamilies.length > 0) {

                const firstFamily = loadedFamilies[0];

                setSelectedFamily(firstFamily);

                familyContext.setFamily(firstFamily);
            }
        }

        loadFamilies();

    }, [session])

    useEffect(() => {

        if (selectedFamily) {

            familyContext.setFamily(selectedFamily);
        }

    }, [selectedFamily]);


    function handleSelect(family: Family) {

        setSelectedFamily(family);

        setOpen(false);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        if (!session) return;

        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const newFamily = await createFamily({ formData: formData, userId: session?.user.id })

        const updatedFamilies = await readFamilies({ userId: session?.user.id });

        setFamilies(updatedFamilies);

        setSelectedFamily(updatedFamilies.find((family) => family.id === newFamily.id) || updatedFamilies[0]);

        familyContext.setFamily(newFamily);

        setShowNewTeamDialog(false)
    }

    return (


        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>

            <Popover open={open} onOpenChange={setOpen}>

                <PopoverTrigger asChild>

                    <Button variant="outline" role="combobox" aria-expanded={open} aria-label="Séléctionnez une famille">

                        {selectedFamily ? `Famille ${selectedFamily.name}` : "Séléctionnez une famille"}

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

                                    <CommandItem key={family.id} onSelect={() => handleSelect(family)} className="text-sm cursor-pointer">

                                        Famille {family.name}

                                        <Check className={cn("ml-auto", selectedFamily && selectedFamily.id === family.id ? "opacity-100" : "opacity-0")} />

                                    </CommandItem>

                                ))}

                            </CommandGroup>

                        </CommandList>

                        <CommandSeparator />

                        <CommandList>

                            <CommandGroup>

                                <DialogTrigger asChild>

                                    <CommandItem className="cursor-pointer" onSelect={() => { setOpen(false); setShowNewTeamDialog(true) }}>

                                        <PlusCircle className="h-5 w-5" />

                                        Créer une famille

                                    </CommandItem>

                                </DialogTrigger>

                            </CommandGroup>

                        </CommandList>

                    </Command>

                </PopoverContent>

            </Popover>

            <DialogContent>

                <form onSubmit={handleSubmit}>

                    <DialogHeader>

                        <DialogTitle>Créer une famille</DialogTitle>

                        <DialogDescription>

                            Add a new team to manage products and customers.

                        </DialogDescription>

                    </DialogHeader>

                    <div className="space-y-4 py-2 pb-4">

                        <div className="space-y-2">

                            <Label htmlFor="name">Nom de famille</Label>

                            <Input id="name" name="name" placeholder="Acme Inc." />

                        </div>

                    </div>

                    <DialogFooter>

                        <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>

                            Cancel

                        </Button>

                        <Button type="submit">Continue</Button>


                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    );
}