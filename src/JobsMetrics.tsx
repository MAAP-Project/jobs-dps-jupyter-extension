import React from 'react';
import { Table } from 'react-bootstrap';
import { IJobMetricsField } from './types';
import { JOB_METRICS_MAP } from './constants';
import { BsInfoCircle } from 'react-icons/bs';
import ReactTooltip from 'react-tooltip';


const JobsMetricsRow = (props: IJobMetricsField) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
      <td>
          <a data-tip={JOB_METRICS_MAP[props.name]}><BsInfoCircle /></a>
          <ReactTooltip place="left" type="dark" effect="solid" className="tooltip" />
      </td>
    </tr>
  )
}

export const JobsMetrics = (props: any) => {
    return (
        <Table className="jobs-table">
            {Object.entries(props.job["data"]["job_specification"]).map(([name,value],i) => {
            return (JOB_METRICS_MAP[name] ? <JobsMetricsRow name={name} value={value}/> : null )
          })}
        </Table>
    )
}