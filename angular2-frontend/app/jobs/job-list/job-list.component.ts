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
  a:string = '';
  constructor(private jobService:JobService) {
  }

  ngOnInit() {
    this.listJobs().subscribe(res =>{res.subscribe(r => console.log('999999999999999999', r))},err=>{console.log(err)});
    console.log(this.a);
  }

  listJobs():any {
    console.log('ggggg   hhhh')
    //this.jobService.listJobs()
    //.subscribe(
    //response => {this.jobs = response.jobs;console.log('44444');return Observable.throw('errror'); },
    //error => {return Observable.throw('ljlkjlkjlkjljlkjlkj'); toastr.error(error)}
    //);
    return this.jobService.listJobs()
    .map(response => {this.jobs = response.jobs; console.log('44444'); return this.jobService.getJob('4a01f9c0-346a-11e6-8102-e17da30f7f9a');})
  }
}