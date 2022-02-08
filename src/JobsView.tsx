import React, { useState, useEffect } from 'react';
//import React from 'react';
//import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { Button, Tab, Nav, Col, Row, Modal, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import "../style/jobs.css";
import SplitPane, { Pane } from 'react-split-pane';
import { JobsOverview } from './JobsOverview';
import { InfoCircle } from 'react-bootstrap-icons';
import { getJobs } from './handler';
import { IJob } from './types';
import { JobsDetails } from './JobsDetails';
import { JobsInputs } from './JobsInputs';
import { JobsMetrics } from './JobsMetrics';

export const JobsView = () => {
  const [activeRow, setActiveRow] = useState(0)
  const [show, setShow] = useState(false);
  const [jobs, updateJobs] = useState<IJob[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleActiveRowUpdate = (activeRow: number) => {
    setActiveRow(activeRow);
  }

  useEffect(() => {

    /* Get user jobs and format relevant data */
    getJobs().then(res => {
      console.log("Get jobs was triggered.")
      console.log(res)
      res["response"]["jobs"].forEach((item:any) => {
        let job:IJob = {}
        let job_id:string = Object.keys(item)[0]
        job["job_id"] = job_id
        job["job_tag"] = item[job_id]["tag"]
        job["algo_name"] = item[job_id]["job_specification"]["id"]
        job["data"] = item[job_id]
        //job["sub_time"] = item[job_id]
        updateJobs(jobs => [...jobs, job]);
      });
    });
  }, [])


  
  return (
    <>
          <SplitPane defaultSize={"50%"} split="horizontal" className="split-pane">
            <Pane>
            <JobsOverview jobs={jobs} handleActiveRowUpdate={handleActiveRowUpdate} activeRow={activeRow}/>
            </Pane>
            <Pane>
              <div style={{ margin: "1rem 0rem" }}>
                <h4 style={{ margin: "1rem", display: "inline" }}>Job Details</h4>
              </div>
              <Tab.Container id="left-tabs-example" defaultActiveKey="general">
                <Row className='details-pane'>
                  <div className="wrap">
                  <Col>
                    <Nav variant="pills" style={{ marginLeft: "1rem" }}>
                      <Nav.Item>
                        <Nav.Link eventKey="general">General</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="inputs">Inputs</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="metrics">Metrics</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col>
                    <Button onClick={handleShow} style={{ float: "right", marginRight: "0.5rem" }} variant="outline-primary">Publish to CMR</Button>
                  </Col>
                  </div>
                  <div className="input-wrapper">
                    <Col>
                      <Tab.Content>
                        <Tab.Pane eventKey="general">
                        {jobs[activeRow] ? <JobsDetails job={jobs[activeRow]} /> : <div>Loading</div>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="inputs">
                        {jobs[activeRow] ? <JobsInputs job={jobs[activeRow]} /> : <div>Loading</div>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="metrics">
                        {jobs[activeRow] ? <JobsMetrics job={jobs[activeRow]} /> : <div>Loading</div>}
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </div>
                </Row>
              </Tab.Container>
              </Pane>
              </SplitPane>

              <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Button className="btn-close" onClick={handleClose}/>
                <Modal.Title>Publish to Content Metadata Repository</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                CMR Selection:
                <InputGroup>
                  <InputGroup.Text id="basic-addon1"><InfoCircle /></InputGroup.Text>
                  <DropdownButton id="dropdown-basic-button" title="Select CMR collection" className="dropdown">
                    <Dropdown.Item>...</Dropdown.Item>
                  </DropdownButton>
                  <InputGroup.Text id="basic-addon2">Required</InputGroup.Text>
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Publish to CMR
                </Button>
              </Modal.Footer>
              </Modal>
    </>
  )
}