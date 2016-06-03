import { Component }  from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES
} from '@angular/router-deprecated';

import { AppComponent }          from './app.component';
import { ApplicantNewComponent } from './applicants/applicant-new/applicant-new.component';

import { ApiService }   from './shared/utils/api.util';
import { Converter }    from './shared/utils/converter.util';

@Component({
  selector   : 'lfcareer-app',
  templateUrl: 'app/routes.component.html',
  directives : [
    ROUTER_DIRECTIVES
  ],
  providers  : [ApiService, Converter]
})

@RouteConfig([
  {
    path     : '/applicants/new',
    name     : 'NewApplicant',
    component: ApplicantNewComponent
  },
  {
    path     : '/...',
    name     : 'App',
    component: AppComponent
  }
])

export class RoutesComponent {
}
