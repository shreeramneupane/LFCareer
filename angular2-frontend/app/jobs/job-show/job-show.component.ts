import { Component, OnInit }              from '@angular/core';
import { ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import * as moment                        from 'moment';

import { AlertBox }    from '../../shared/utils/alertBox';
import { Job }         from '../shared/job'
import { JobService }  from '../shared/job.service';
import { PageHeader }  from '../../shared/components/page-header/pageHeader.component';

import * as toastr from 'toastr';

@Component({
  selector  : 'job-show',
  styles    : [require('./job-show.component.css')],
  template  : require('./job-show.component.html'),
  providers : [JobService, AlertBox],
  directives: [PageHeader, ROUTER_DIRECTIVES]
})

export class JobShowComponent implements OnInit {
  public job:Job;
  public applicants:Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}];
  breadCrumb:any = [{name: 'Dashboard', route: ['/App/Dashboard']}, {
    name : 'Job',
    route: ['/App/Job']
  }, {name: 'Details'}];

  constructor(private jobService:JobService, private routeParams:RouteParams, private alertBox:AlertBox) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.getJob(id);
  }

  getJob(id:string) {
    this.jobService.getJob(id).subscribe(
    job => {
      this.job = job;
      this.job.valid_until = moment(job.valid_until).format('Do MMMM YYYY');
    },
    error => toastr.error(error)
    );
  }

  closeJob() {
    this.alertBox.confirm('Are you sure you want to close this job?', function () {
      console.log('Call api related to closing job');
    });
  }
}