import { Component, Input } from '@angular/core';

import { OpenJob } from '../shared/open-job';
import { OpenJobComponent } from './open-job/open-job.component';
@Component({
  selector   : 'open-jobs',
  templateUrl: 'app/dashboard/open-jobs/open-jobs.component.html',
  directives : [OpenJobComponent]
})
export class OpenJobsComponent {
  @Input() openJobs:Array<OpenJob>;
}
