import { Component, Input } from '@angular/core';

import { OpenJob } from '../../shared/open-job';

@Component({
  selector   : 'open-job',
  templateUrl: 'app/dashboard/open-jobs/open-job/open-job.component.html',
})
export class OpenJobComponent {
  @Input() openJob:OpenJob;
}
