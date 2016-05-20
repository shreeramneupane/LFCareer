import { Component }  from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES
} from '@angular/router-deprecated';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PositionsComponent } from './positions/positions.component';
import { StagesComponent }    from './stages/stages.component';
import { JobsComponent }      from './jobs/jobs.component';

@Component({
  selector   : 'lfcareer-app',
  templateUrl: 'app/app.component.html',
  directives : [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path        : '/dashboard',
    name        : 'Dashboard',
    component   : DashboardComponent,
    useAsDefault: true
  },
  {
    path     : '/positions/...',
    name     : 'Position',
    component: PositionsComponent
  },
  {
    path     : '/stages/...',
    name     : 'Stage',
    component: StagesComponent
  },
  {
    path     : '/jobs/...',
    name     : 'Job',
    component: JobsComponent
  }
])

export class AppComponent {
}
