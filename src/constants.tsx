/**
 * Mapping for friendlier job field names.
 */
export const job_field_mapping : { [key: string]: any } = {
    "job_status" : {"name":"Status", "desc": "Status of submitted job"},
    "job_id" : {"name": "ID", "desc": "Unique job idenitifer"},
    "job_tag" : {"name": "Tag", "desc": "User-specified job tag"},
    "algo_name" : {"name": "Algorithm","desc": "Name of algorithm the job ran"},
    "sub_time" : {"name": "Submission Time", "desc": "Time at which the job was submitted"},
    "products" : {"name": "Products", "desc": "Location of generated products"},
    "error" : {"name": "Error", "desc": "Errors generated from running the job"}
}

export const job_status : { [key: string]: any } = {
    "processing" : "PROCESSING",
    "failed" : "FAILED",
    "succeeded" : "SUCCEEDED",
    "undefined" : "UNDEFINED", /* Note: this is not a recognized job status in HySDS world*/
    "deleted" : "DELETED"
}

/* Defines the fields that will show up under the Jobs Metrics tab*/
export const JOB_METRICS_MAP : { [key: string]: any } = {
    "soft_time_limit" : "Soft time limit",
    "disk_usage" : "Disk usage",
    "time_limit" : "Time limit"
}