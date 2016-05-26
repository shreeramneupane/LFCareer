import { Component } from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES,
} from '@angular/router-deprecated';

import { ApplicantEditComponent } from './applicant-edit/applicant-edit.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { ApplicantNewComponent }  from './applicant-new/applicant-new.component';
import { ApplicantShowComponent } from './applicant-show/applicant-show.component';

@Component({
  selector   : 'lfcareer-applicants',
  templateUrl: 'app/applicants/applicants.component.html',
  directives : [
    ROUTER_DIRECTIVES
  ]
})

@RouteConfig([
  {
    path        : '/',
    name        : 'ApplicantList',
    component   : ApplicantListComponent,
    useAsDefault: true
  },
  {
    path     : '/new',
    name     : 'ApplicantAdd',
    component: ApplicantNewComponent
  },
  {
    path     : '/edit/:id',
    name     : 'ApplicantEdit',
    component: ApplicantEditComponent
  },
  {
    path     : '/show/:id',
    name     : 'ApplicantShow',
    component: ApplicantShowComponent
  }
])

export class ApplicantsComponent {
}
