import React, { useEffect, useState } from 'react';
import { job_status } from './constants';
import { Button } from 'react-bootstrap';
import { parseJobStatus } from './utils';
import { getJobStatus } from './handler';

export const JobStatus = (job_id: any) => {


    const [status, setStatus] = useState<string>('')


    useEffect(() => {
        getJobStatus(job_id["job_id"]).then(res => {
            let body = res["response" as any]
            setStatus(parseJobStatus(body).toLowerCase())
        });
    }, [status])


    const getStatusText = (status: any) => {
        return status ? status : "undefined"
    }


    return (
        <div style={{ textAlign: 'center' }}>
            <Button className={`job-${getStatusText(status)} btn-sm`}>{job_status[getStatusText(status)]}</Button>
        </div>
    )
}