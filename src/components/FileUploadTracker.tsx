import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";


interface Task {
    id: string;
    name: string;
    status: "pending" | "processing" | "success" | "failed" | "cancelled";
    retries: number;
}

export default function FileUploadTracker() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (file: File) => {
        const taskId = uuidv4();
        const newTask: Task = {
            id: taskId,
            name: file.name,
            status: "pending",
            retries: 0
        };
        setTasks(prev => [...prev, newTask]);
    };

    return (
        <div className="">
            <h1 className="text-xl font-bold mb-4">File Upload Tracker</h1>
            <input
                type="file"
                className="mb-4 block w-full"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) addTask(file);
                }}
            />
        </div>
    );
}
