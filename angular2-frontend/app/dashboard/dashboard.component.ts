import { Component, OnInit } from '@angular/core';

import { Applicant } from '../applicants/applicant-list/applicant';
import { DashboardService } from './shared/dashboard.service';
import { NewApplicantsComponent } from './new-applicants/new-applicants.component';
import { OpenJobsComponent }   from './open-jobs/open-jobs.component';
import { OpenJob } from './shared/open-job';
import { PageHeader } from '../shared/components/page-header/pageHeader.component';

@Component({
  selector   : 'dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  directives : [PageHeader, OpenJobsComponent, NewApplicantsComponent],
  providers  : [DashboardService]
})

export class DashboardComponent implements OnInit {
  openJobs:Array<OpenJob> = [];
  newApplicants:Array<Applicant> = [];

  constructor(private dashboardService:DashboardService) {

  }

  ngOnInit() {
    this.getData();
  }

  getData():void {
    this.openJobs = this.dashboardService.getOpenJobs();
    this.newApplicants = this.dashboardService.getNewApplicants();
    console.log(this.newApplicants)
  }
}
