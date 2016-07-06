import { Component, EventEmitter, Output, OnInit } from '@angular/core';

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
  @Output() startTimeline = new EventEmitter<any>();

  jobs:Array<Job> = [];
  job_id:string = '0';
  timeline:any;

  constructor(private jobService:JobService) {
  }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getAllJobs()
    .subscribe(
    response => {
      this.jobs = response.jobs;
    },
    error => toastr.error(error)
    );
  }

  startTimelinew() {
    this.timeline = {};
    this.timeline.is_processable = true;
    this.startTimeline.emit(this.timeline);
  }

  assignToJob() {
    if (this.job_id == '0') {
      toastr.error('Please enter job type', 'Error!');
    } else {
      this.timeline = {};
      this.timeline.job_id = this.job_id;
      this.startTimeline.emit(this.timeline);
    }
  }
}
