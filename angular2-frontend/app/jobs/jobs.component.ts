import { Component } from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES,
} from '@angular/router-deprecated';

import { JobEditComponent } from './job-edit/job-edit.component';
import { JobList }          from './job-list/job-list.component';
import { JobNewComponent }  from './job-new/job-new.component';
import { JobShowComponent } from './job-show/job-show.component';

@Component({
  selector: 'lfcareer-jobs',
  templateUrl: 'app/jobs/jobs.component.html',
  directives: [
    ROUTER_DIRECTIVES
  ]
})

@RouteConfig([
  {
    path: '/',
    name: 'JobList',
    component: JobList,
    useAsDefault: true
  },
  {
    path: '/new',
    name: 'JobAdd',
    component: JobNewComponent
  },
  {
    path: '/edit/:id',
    name: 'JobEdit',
    component: JobEditComponent
  },
  {
    path: '/show/:id',
    name: 'JobShow',
    component: JobShowComponent
  }
])

export class JobsComponent {
}
