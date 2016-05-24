import {Component} from '@angular/core';
import {
Router,
RouteConfig,
ROUTER_DIRECTIVES,
ROUTER_PROVIDERS
} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

import { Header } from './shared/header/header.component';
import { Sidebar } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'lfcareer-app',
  templateUrl: 'app/app.component.html',
  directives: [
    ROUTER_DIRECTIVES, Header, Sidebar
  ],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS]
})

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  }
])

export class AppComponent {
  constructor(public router:Router) {
  }
}
