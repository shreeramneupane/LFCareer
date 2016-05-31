import { Component }                  from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { Job }               from '../shared/job'
import { JobFormComponent }  from '../job-form/job-form.component';
import { JobService }        from '../shared/job.service';
import { PageHeader }        from '../../shared/components/page-header/pageHeader.component';

@Component({
  selector: 'job-new',
  templateUrl: 'app/jobs/job-new/job-new.component.html',
  providers: [JobService],
  directives: [ROUTER_DIRECTIVES, PageHeader, JobFormComponent]
})

export class JobNewComponent {
  job:Job = new Job();

  constructor(private jobService:JobService, private router:Router) {
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
