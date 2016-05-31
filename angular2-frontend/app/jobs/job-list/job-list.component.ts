import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Job }        from '../shared/job';
import { JobService } from '../shared/job.service';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';

@Component({
  selector: 'job-list',
  templateUrl: 'app/jobs/job-list/job-list.component.html',
  directives: [PageHeader, ROUTER_DIRECTIVES],
  providers: [JobService]
})

export class JobList implements OnInit {
  jobs:any = [];

  constructor(private jobService:JobService) {
  }

  ngOnInit() {
    this.listJobs();
  }

  listJobs() {
    this.jobService.listJobs()
   .subscribe(
    jobs => this.jobs = jobs,
    error => toastr.error(error)
    );
  }
}