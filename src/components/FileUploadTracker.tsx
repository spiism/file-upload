import React, {useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";


interface Task {
    id: string;
    name: string;
    status: "pending" | "processing" | "success" | "failed" | "cancelled";
    retries: number;
    intervalId?: NodeJS.Timeout;
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
        simulateStartTask(taskId);
    };

    //simulate API starts processing the task
    const simulateStartTask = (taskId: string) => {
        updateTaskStatus(taskId, "processing");
        //2s interval to simulate polling
        const intervalId = setInterval(() => pollStatus(taskId), 2000);
        setTasks(prev =>
            prev.map(task => (task.id === taskId ? { ...task, intervalId } : task))
        );
    };


    const pollStatus = (taskId: string) => {
        setTasks(prev => {
            return prev.map(task => {
                if (task.id !== taskId || task.status !== "processing") return task;

                if (task.retries >= 3) {
                    clearInterval(task.intervalId);
                    return { ...task, status: "failed" };
                }

                //10% fail
                const shouldFail = Math.random() < 0.1;
                //30% success
                const shouldSucceed = Math.random() < 0.3;

                if (shouldFail) {
                    return { ...task, retries: task.retries + 1 };
                }

                if (shouldSucceed) {
                    clearInterval(task.intervalId);
                    return { ...task, status: "success" };
                }

                return { ...task, retries: task.retries + 1 };
            });
        });
    };

    //update task status
    const updateTaskStatus = (taskId: string, status: Task["status"]) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, status, retries: status === "processing" ? task.retries : 0 } : task
            )
        );
    };

    const cancelTask = (taskId: string) => {
        setTasks(prev => {
            return prev.map(task => {
                if (task.id === taskId && task.intervalId) {
                    clearInterval(task.intervalId);
                    return { ...task, status: "cancelled" };
                }
                return task;
            });
        });
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

            <div className="space-y-2">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className="p-2 border rounded flex justify-between items-center text-sm"
                    >
                        <div>
                            <div className="font-medium">{task.name}</div>
                            <div className="text-xs">Status: {task.status}</div>
                        </div>
                        {task.status === "processing" && (
                            <button
                                className="text-red-500 text-xs ml-2"
                                onClick={() => cancelTask(task.id)}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
