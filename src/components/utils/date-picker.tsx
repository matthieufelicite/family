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
import { readTodayTasksWithDate } from "@/actions/history/read-today-tasks-with-date"
import { useRouter } from "next/navigation"

interface Props {

    className?: string;
}

export default function DatePicker({ className }: Props) {

    const [date, setDate] = useState<Date>(new Date());

    const router = useRouter();

    async function handleSelect(selectedDate: Date | undefined) {

        if (!selectedDate) return;

        await readTodayTasksWithDate({ date: selectedDate });

        router.refresh();

        setDate(selectedDate);
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