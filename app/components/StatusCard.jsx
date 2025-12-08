"use client"; // Add this directive at the very top

import React, { useEffect } from 'react';
import { jobId, setJobId } from "./ProcessorStartCard";

export function StatusCard() {
    useEffect(() => {
        if (!jobId) return; // Check if jobId is initialized

        let intervalId = null;
        let stopped = false;

        async function poll() {
            try {
                const status = await getJobStatus(jobId.jobId);
                console.log("STATUS:", status);

                if (status.status === "done") {
                    console.log("Job finished!", status.result);
                    stopped = true;
                    clearInterval(intervalId);
                }
            } catch (err) {
                console.error("Error polling job:", err);
            }
        }

        intervalId = setInterval(poll, 2000);
        poll();

        return () => {
            clearInterval(intervalId);
            stopped = true;
        };
    }, [jobId]); // Only re-run effect if jobId changes

    // Ensure jobId is properly initialized before rendering
    if (!jobId || !jobId.jobId) {
        return null; // Don't render the card if jobId is not initialized
    }

    return (
        <div className="card-row">
            <div className="status-card">
                <h3>Processing Status</h3>
                <p>Job ID: {jobId.jobId}</p>
                <p>Status: {jobId.status || "Loading..."}</p>
            </div>
        </div>
    );
}
