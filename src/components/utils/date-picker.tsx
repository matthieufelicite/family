"use client"

import { format } from "date-fns"
import { fr } from "date-fns/locale"; // Import the French locale
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDate } from "../providers/date-provider";
import readHistories from "@/actions/history/read-histories";
import { useSession } from "next-auth/react";
import { useFamily } from "../providers/family-provider";

interface Props {

    className?: string;
}

export default function DatePicker({ className }: Props) {

    const familyContext = useFamily();

    const dateContext = useDate();

    const [date, setDate] = useState<Date>(new Date());

    const router = useRouter();

    async function handleSelect(selectedDate: Date | undefined) {

        if (!familyContext.family) return;

        if (!selectedDate) return;

        await readHistories({ date: selectedDate, familyId: familyContext.family?.id });

        setDate(selectedDate);

        dateContext.setDate(selectedDate);

        router.refresh();
    }

    return (

        <Popover>

            <PopoverTrigger asChild className={className}>

                <Button variant={"outline"}>

                    <CalendarIcon />

                    {date ? format(date, "PPP", { locale: fr }) : <span>Pick a date</span>} {/* Add locale option */}

                </Button>

            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">

                <Calendar mode="single" selected={date} onSelect={(selectedDate) => handleSelect(selectedDate)} initialFocus />

            </PopoverContent>

        </Popover>
    );
}