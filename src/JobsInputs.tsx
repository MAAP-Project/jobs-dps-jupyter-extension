import React from 'react';
import { Table } from 'react-bootstrap';
import { IJobInputField } from './types';
import ReactJson from 'react-json-view'
import { isPlainObject } from '@reduxjs/toolkit';
// import { BsInfoCircle } from 'react-icons/bs';
// import { job_field_mapping } from './constants';
// import ReactTooltip from 'react-tooltip';


const JobsInputsRow = (props: IJobInputField) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{isPlainObject(props.value) ? <ReactJson src={props.value} theme="summerfruit:inverted" collapsed={true} displayDataTypes={false}/> : props.value}</td>
      {/* <td>{props.value.toString()}</td> */}
      <td>{props.destination}</td>
      {/* <td>
        <a data-tip={job_field_mapping[props.name]["desc"]}><BsInfoCircle /></a>
        <ReactTooltip place="left" type="dark" effect="solid" className="tooltip"/>
      </td> */}
    </tr>
  )
}

export const JobsInputs = (props: any) => {
    return (
        <Table className="jobs-table">
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Destination</th>
            </tr>
            {Object.entries(props.job["data"]["job_specification"]["params"]).map((item : any) => {
            return <JobsInputsRow name={item[1]["name"]} value={item[1]["value"]} destination={item[1]["destination"]} />
          })}
        </Table>
    )
}