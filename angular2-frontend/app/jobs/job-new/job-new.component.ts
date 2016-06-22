import { Component }                  from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { Job }               from '../shared/job'
import { JobFormComponent }  from '../job-form/job-form.component';
import { JobService }        from '../shared/job.service';
import { PageHeader }        from '../../shared/components/page-header/pageHeader.component';
import { StageService } from '../../stages/shared/stage.service';

import * as toastr from 'toastr';

@Component({
  selector  : 'job-new',
  template  : require('./job-new.component.html'),
  providers : [JobService, StageService],
  directives: [ROUTER_DIRECTIVES, PageHeader, JobFormComponent]
})

export class JobNewComponent {
  job:Job = new Job();
  stages:Array<any>;

  constructor(private jobService:JobService, private stageService:StageService, private router:Router) {
    this.getStages();
  }

  getStages() {
    this.stageService.getAllStages().subscribe(
    response => {
      this.stages = response.stages;
      this.stages.forEach(stage => {
        if (stage.is_default == true) {
          this.job.stages.push(stage);
        }
      }
      )
    },
    error => toastr.error(error)
    )
  }

  onSubmit(job:Job) {
    this.jobService.createJob(job)
    .subscribe(
    job => {
      this.router.navigate(['JobList']);
      toastr.success('New Job Created Successfully!');
    },
    error => toastr.error(error)
    );
  }
}
