"use client"

import { useEffect, useState } from "react";
import ReadOneTask from "./read-one-task";
import { useDate } from "../providers/date-provider";
import readHistories from "@/actions/history/read-histories";
import { CustomTask } from "@/actions/history/read-histories";
import { useFamily } from "../providers/family-provider";

export default function ReadAllTasks() {

    const dateContext = useDate();

    const familyContext = useFamily();

    const [tasks, setTasks] = useState<CustomTask[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function readTasks() {

            if (!familyContext.family) return;

            try {

                setTasks(await readHistories({ date: dateContext.date, familyId: familyContext.family.id }));
            }
            catch (error) {

                console.error("Erreur lors de la récupération des tâches : ", error);
            }
            finally {

                setLoading(false);
            }
        }

        readTasks()
    }, [dateContext, familyContext.family])

    if (loading) {

        return (

            <div className="flex justify-start items-center p-6">Chargement des tâches...</div>
        );
    }

    return (

        <div className="flex flex-col gap-6 p-6">

            {tasks.map((task) => (

                <ReadOneTask key={task.id} task={task} />
            ))}

        </div>
    );
};