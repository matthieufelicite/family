"use client"

import { useEffect, useState } from "react";
import ReadOneTask from "./read-one-task";
import { TaskWithStatus } from "@/actions/history/read-today-tasks";
import { useDate } from "../providers/date-provider";
import { readTodayTasksWithDate } from "@/actions/history/read-today-tasks-with-date";

export default function ReadAllTasks() {

    const dateContext = useDate();

    const [tasks, setTasks] = useState<TaskWithStatus[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function readTasks() {

            try {

                console.log(dateContext.date)

                setTasks(await readTodayTasksWithDate({ date: dateContext.date }));
            }
            catch (error) {

                console.error("Erreur lors de la récupération des tâches : ", error);
            }
            finally {

                setLoading(false);
            }
        }

        readTasks()
    }, [dateContext])

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