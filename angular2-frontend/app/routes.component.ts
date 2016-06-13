import { Component }  from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES
} from '@angular/router-deprecated';

import { AppComponent }          from './app.component';
import { ApplicantNewComponent } from './applicants/applicant-new/applicant-new.component';
import { ApplicantCreationSuccessComponent } from './applicants/applicant-creation-success/applicant-creation-success.component';
import { ApiService }   from './shared/utils/api.util';
import { App }          from './shared/assets/typescripts/app';
import { Converter }    from './shared/utils/converter.util';
import { Sorter } from './shared/utils/sort.util';

@Component({
  selector  : 'lfcareer-app',
  template  : require('./routes.component.html'),
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers : [ApiService, App, Converter, Sorter]
})

@RouteConfig([
  {
    path     : '/applicants/new',
    name     : 'NewApplicant',
    component: ApplicantNewComponent
  },
  {
    path     : '/applicants/success',
    name     : 'NewApplicantSuccess',
    component: ApplicantCreationSuccessComponent
  },
  {
    path     : '/...',
    name     : 'App',
    component: AppComponent
  }
])

export class RoutesComponent {
}
