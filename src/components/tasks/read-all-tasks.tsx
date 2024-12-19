"use client"

import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import ReadOneTask from "./read-one-task";
import { readTodayTasks, TaskWithStatus } from "@/actions/history/read-today-tasks";

const ReadAllTasks: React.FC = () => {
    const [tasks, setTasks] = useState<TaskWithStatus[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await readTodayTasks();
                setTasks(fetchedTasks);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError("Failed to fetch tasks.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <div className="p-6 lg:px-8">Loading tasks...</div>;
    }

    if (error) {
        return <div className="p-6 lg:px-8">Error: {error}</div>;
    }

    return (
        <div className="p-6 lg:px-8">
            {tasks.length === 0 ? (
                <p>
                    Vous n&apos;avez pas encore de tâches à suivre. Essayez d&apos;en ajouter pour
                    commencer.
                </p>
            ) : (
                <Card className="flex flex-col gap-4 p-4">
                    {tasks.map((task) => (
                        <ReadOneTask key={task.id} task={task} />
                    ))}
                </Card>
            )}
        </div>
    );
};

export default ReadAllTasks;