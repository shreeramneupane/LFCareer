import { Component, OnInit } from '@angular/core';

import { Job } from '../../../jobs/shared/job';
import { JobService } from '../../../jobs/shared/job.service';

import * as toastr from 'toastr';

@Component({
  selector : 'hiring-pipeline',
  styles   : [require('../applicant-show.component.css')],
  template : require('./hiring-pipeline.component.html'),
  providers: [JobService]
})

export class HiringPipeline implements OnInit {
  jobs:Array<Job> = [];
  job_id:string = '0';

  constructor(private jobService:JobService) {
  }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.listJobs()
    .subscribe(
    response => {
      this.jobs = response.jobs;
    },
    error => toastr.error(error)
    );
  }

  assignToJob() {
    if (this.job_id == '0') {
      toastr.error('Please enter job type', 'Error!');
    } else {
      console.log('submit')
    }
  }
}
