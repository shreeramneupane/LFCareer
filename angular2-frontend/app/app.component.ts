import { Component } from '@angular/core';
import {
RouteConfig,
ROUTER_DIRECTIVES,
ROUTER_PROVIDERS
} from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

import { DashboardComponent }     from './dashboard/dashboard.component';
import { PositionsComponent }  from './positions/positions.component';

@Component({
  selector   : 'lfcareer-app',
  templateUrl: 'app/app.component.html',
  directives : [ROUTER_DIRECTIVES],
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
    path     : '/positions/...',
    name     : 'Position',
    component: PositionsComponent
  }
])

export class AppComponent {
}
