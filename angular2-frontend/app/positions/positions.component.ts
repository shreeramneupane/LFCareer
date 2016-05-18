import { Component }  from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES,
} from '@angular/router-deprecated';

import { PositionListComponent }  from './position-list/position-list.component';
import { PositionShowComponent }  from './position-show/position-show.component';
import { PositionNewComponent }   from './position-new/position-new.component';
import { PositionEditComponent }  from './position-edit/position-edit.component';

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
    path     : '/:id',
    name     : 'PositionShow',
    component: PositionShowComponent
  },
  {
    path     : '/new',
    name     : 'PositionNew',
    component: PositionNewComponent
  },
  {
    path     : '/edit/:id',
    name     : 'PositionEdit',
    component: PositionEditComponent
  }
])

export class PositionsComponent {
}
