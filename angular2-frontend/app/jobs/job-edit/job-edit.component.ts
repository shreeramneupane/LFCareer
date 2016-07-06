import { Component, OnInit } from '@angular/core';
import {
ROUTER_DIRECTIVES,
RouteParams,
Router
} from '@angular/router-deprecated';

import { Job }               from '../shared/job';
import { JobFormComponent }  from '../job-form/job-form.component';
import { JobService }        from '../shared/job.service';
import { PageHeader }        from '../../shared/components/page-header/pageHeader.component';
import { StageService } from '../../stages/shared/stage.service';

import * as toastr from 'toastr';

@Component({
  selector  : 'job-edit',
  template  : require('./job-edit.component.html'),
  providers : [JobService, StageService],
  directives: [ROUTER_DIRECTIVES, PageHeader, JobFormComponent]
})

export class JobEditComponent implements OnInit {
  public job:Job = new Job();
  stages:Array<any>;

  public breadCrumb:any = [{name: 'Dashboard', route: ['/App/Dashboard']}, {
    name : 'Job',
    route: ['/App/Job']
  }, {name: 'Edit'}];

  constructor(private jobService:JobService, private stageService:StageService, private routeParams:RouteParams, private router:Router) {
  }

  ngOnInit() {
    this.getJob();
  }


  getJob() {
    let id = this.routeParams.get('id');
    this.jobService.getJob(id).subscribe(
    job => {
      this.job = job;
      this.getStages();
    },
    error => toastr.error(error)
    );
  }

  getStages() {
    this.stageService.getAllStages().subscribe(
    response => {
      this.stages = response.stages;
    },
    error => toastr.error(error)
    )
  }

  onSubmit(job:Job) {
    this.jobService.updateJob(job)
    .subscribe(
    job => {
      this.router.navigate(['JobShow', {id: this.job.id}]);
      toastr.success('Job Updated Successfully!');
    },
    error => toastr.error(error)
    );
  }
}
