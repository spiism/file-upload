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

    //Reject files that aren’t PDFs or images under 2MB
    const validateFile = (file: File) => {
        const isValidType = file.type === "application/pdf" || file.type.startsWith("image/");
        const isValidSize = file.size < 2 * 1024 * 1024;
        return isValidType && isValidSize;
    };

    const addTask = (file: File) => {
        if (!validateFile(file)) {
            alert("Only PDFs and images under 2MB are allowed.");
            return;
        }
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
