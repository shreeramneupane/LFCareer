import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Observable }                     from 'rxjs/Rx';

import { Job }        from '../shared/job';
import { JobService } from '../shared/job.service';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';

import * as toastr from 'toastr';

@Component({
  selector  : 'job-list',
  template  : require('./job-list.component.html'),
  directives: [PageHeader, ROUTER_DIRECTIVES],
  providers : [JobService]
})

export class JobList implements OnInit {
  jobs:any = [];

  constructor(private jobService:JobService) {
  }

  ngOnInit() {
    this.listJobs();
  }

  listJobs():any {
    this.jobService.listJobs()
    .subscribe(
    response => this.jobs = response.jobs,
    error => toastr.error(error)
    );
  }
}