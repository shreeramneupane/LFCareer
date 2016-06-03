import { Component, OnInit } from '@angular/core';

import { DashboardService } from './shared/dashboard.service';
import { OpenJobsComponent }   from './open-jobs/open-jobs.component';
import { OpenJob } from './shared/open-job';
import { PageHeader } from '../shared/components/page-header/pageHeader.component';

@Component({
  selector   : 'dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  directives : [PageHeader, OpenJobsComponent],
  providers  : [DashboardService]
})
export class DashboardComponent implements OnInit {
  openJobs:Array<OpenJob> = [];

  constructor(private dashboardService:DashboardService) {

  }

  ngOnInit() {
    this.getOpenJobs();
  }

  getOpenJobs():void {
    this.openJobs = this.dashboardService.getOpenJobs();
  }
}
