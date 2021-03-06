import { Component }  from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES,
} from '@angular/router-deprecated';

import { StageEditComponent }  from './stage-edit/stage-edit.component';
import { StageListComponent }  from './stage-list/stage-list.component';
import { StageNewComponent }   from './stage-new/stage-new.component';

@Component({
  selector  : 'lfcareer-stages',
  template  : require('./stages.component.html'),
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path        : '/',
    name        : 'StageList',
    component   : StageListComponent,
    useAsDefault: true
  },
  {
    path     : '/new',
    name     : 'StageNew',
    component: StageNewComponent
  },
  {
    path     : '/edit/:id',
    name     : 'StageEdit',
    component: StageEditComponent
  }
])

export class StagesComponent {
}
