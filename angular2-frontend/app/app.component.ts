import {Component} from '@angular/core';
import {
    Router,
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS
} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PositionsListComponent} from './components/position/list.component';

@Component({
    selector: 'lfcareer-app',
    templateUrl: 'app/app.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS]
})

@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/positions',
        name: 'Positions',
        component: PositionsListComponent,
    }
])

export class AppComponent {
    constructor(public router:Router) {
    }
}
