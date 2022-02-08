import { ReactWidget } from '@jupyterlab/apputils';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { JobsView } from './JobsView';
import { JobsSubmit } from './JobsSubmit';
import { Tabs, Tab } from 'react-bootstrap'; 

export class JobsWidget extends ReactWidget {
  
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    
    return (
      <Tabs defaultActiveKey="view-jobs" id="jobs-widget-tabs" className="mb-3">
        <Tab eventKey="view-jobs" title="View">
        {console.log("Mounting jobsview!!!")}
          <JobsView/>
        </Tab>
        <Tab eventKey="submit-jobs" title="Submit">
          <JobsSubmit />
        </Tab>
      </Tabs>
    )
  }
}