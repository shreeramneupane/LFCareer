import { Component, OnInit }              from '@angular/core';
import { ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

import { Job }         from '../shared/job'
import { JobService }  from '../shared/job.service';
import { PageHeader }  from '../../shared/page-header/pageHeader.component';

@Component({
  selector   : 'job-show',
  templateUrl: 'app/jobs/job-show/job-show.component.html',
  providers  : [JobService],
  directives : [PageHeader, ROUTER_DIRECTIVES]
})

export class JobShowComponent implements OnInit {
  public job:Job;

  constructor(private jobService:JobService, private routeParams:RouteParams) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.getJob(id);
  }

  getJob(id:string) {
    this.jobService.getJob(id).subscribe(
    job => {
      this.job = job;
      var date = new Date(this.job.valid_until);
      this.job.valid_until =  date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    },
    error => toastr.error(error)
    );
  }
}
