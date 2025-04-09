import React, {useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";


interface Task {
    id: string;
    name: string;
    status: "pending" | "processing" | "success" | "failed" | "cancelled";
    retries: number;
}

export default function FileUploadTracker() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    //Reject files that aren’t PDFs or images under 2MB
    const validateFile = (file: File) => {
        const isPdf = file.type === "application/pdf";
        const isUnder2MB = file.size < 2 * 1024 * 1024;
        return (isPdf ) && isUnder2MB;
    };

    const addTask = (file: File) => {
        if (!validateFile(file)) {
            setErrorMessage("Only PDFs and images under 2MB are allowed.");
            alert("Only PDFs and images under 2MB are allowed.");
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }
        //clear error when file upload's valid
        setErrorMessage(null);
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
                ref={fileInputRef}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) addTask(file);
                }}
                className="mb-2 block w-full"
            />
            {errorMessage && (
                <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
            )}
        </div>
    );
}
