import {Component} from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES,
ROUTER_PROVIDERS
} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PositionsListComponent} from './components/position/list.component';
import {PositionNewComponent} from './components/position/new.component';

@Component({
  selector   : 'lfcareer-app',
  templateUrl: 'app/app.component.html',
  directives : [
    ROUTER_DIRECTIVES
  ],
  providers  : [ROUTER_PROVIDERS, HTTP_PROVIDERS]
})

@RouteConfig([
  {
    path        : '/dashboard',
    name        : 'Dashboard',
    component   : DashboardComponent,
    useAsDefault: true
  },
  {
    path     : '/positions',
    name     : 'Positions',
    component: PositionsListComponent
  },
  {
    path     : '/positions/new',
    name     : 'PositionNew',
    component: PositionNewComponent
  }
])

export class AppComponent {
}
