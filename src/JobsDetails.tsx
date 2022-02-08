import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { IJobDetailsProps, IJobField } from './types';
import { BsInfoCircle } from 'react-icons/bs';
import { job_field_mapping, job_status } from './constants';
import ReactTooltip from 'react-tooltip';

/**
 * Render components for individual cells within rows.
 */
const JobDetailsCell = (props: IJobField) => {
  switch(props.name) {
    case "job_status": return <Button className={`${props.value} btn-sm`}>{job_status[props.value]}</Button>
    case "products": return <a href={props.value}>{props.value}</a>
    default: return props.value;
  }
}


const JobsDetailsRow = (props: IJobField) => {
  return (
    <tr>
      <td>{job_field_mapping[props.name]["name"]}</td>
      <td>{JobDetailsCell(props)}</td>
      <td>
        <a data-tip={job_field_mapping[props.name]["desc"]}><BsInfoCircle /></a>
        <ReactTooltip place="left" type="dark" effect="solid" className="tooltip"/>
      </td>
    </tr>
  )
}

export const JobsDetails = (props: IJobDetailsProps) => {
    return (
        <Table className="jobs-table">
          {Object.entries(props.job).map(([name,value],i) => {
            return (name in job_field_mapping ? <JobsDetailsRow name={name} value={value}/> : null )
          })}
        </Table>
    )
}