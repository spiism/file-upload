import React from "react";


interface Task {
    id: string;
    name: string;
    status: "pending" | "processing" | "success" | "failed" | "cancelled";
    retries: number;
}

export default function FileUploadTracker() {

    return (
        <div className="">
            <h1 className="text-xl font-bold mb-4">File Upload Tracker</h1>
            <input
                type="file"
                className="mb-4 block w-full"
            />
        </div>
    );
}
