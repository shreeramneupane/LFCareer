import { Component, OnInit } from '@angular/core';
import {
ROUTER_DIRECTIVES,
RouteParams,
Router
} from '@angular/router-deprecated';

import { Job }               from '../shared/job';
import { JobFormComponent }  from '../job-form/job-form.component';
import { JobService }        from '../shared/job.service';
import { PageHeader }        from '../../shared/page-header/pageHeader.component';

@Component({
  selector: 'job-edit',
  templateUrl: 'app/jobs/job-edit/job-edit.component.html',
  providers: [JobService],
  directives: [ROUTER_DIRECTIVES, PageHeader, JobFormComponent]
})

export class JobEditComponent implements OnInit {
  public job:Job = new Job();

  constructor(private jobService:JobService, private routeParams:RouteParams, private router:Router) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.jobService.getJob(id).subscribe(
    job => {
      let date = new Date(job.valid_until);
      job.valid_until = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      this.job = job;
    },
    error => toastr.error(error)
    );
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
