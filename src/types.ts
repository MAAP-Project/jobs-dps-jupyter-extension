export interface IJobField {
    name: string,
    value: string
}

export interface IJobMetricsField {
    name: string,
    value: any
}

export interface IJobInputField {
    name: string,
    value: any,
    destination: string
}

export interface IJob {
    job_status?: string,
    job_tag?: string,
    job_id?: string,
    algo_name?: string,
    sub_time?: string,
    data?: any
}

// export interface IJobViewProps {
//     jobs: IJob[]
// }

export interface IJobDetailsProps {
    job: IJob
}

export interface IJobOverviewProps {
    activeRow: number,
    handleActiveRowUpdate: (param: any) => void,
    jobs: IJob[],
    //fetchData: () => void
}

export interface IAlgorithm {
    value?: string,
    label?: string
}