import { Component } from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES,
} from '@angular/router-deprecated';

import { PositionListComponent }  from './position-list/position-list.component';
import { PositionNewComponent }   from './position-new/position-new.component';

@Component({
  selector   : 'lfcareer-positions',
  templateUrl: 'app/positions/positions.component.html',
  directives : [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path        : '/',
    name        : 'PositionList',
    component   : PositionListComponent,
    useAsDefault: true
  },
  {
    path     : '/new',
    name     : 'PositionNew',
    component: PositionNewComponent
  }
])

export class PositionsComponent {
}
