import { Component } from '@angular/core';
import {
Router,
ROUTER_DIRECTIVES
} from '@angular/router-deprecated';

import { ApplicantsComponent } from '../../../applicants/applicants.component';
import { DashboardComponent }  from '../../../dashboard/dashboard.component';
import { JobsComponent }       from '../../../jobs/jobs.component';
import { PositionsComponent }  from '../../../positions/positions.component';
import { StagesComponent }     from '../../../stages/stages.component';

@Component({
  selector  : 'sidebar',
  template  : require('./sidebar.component.html'),
  directives: [
    ROUTER_DIRECTIVES
  ]
})

export class Sidebar {
  constructor(public router:Router) {
  }
}