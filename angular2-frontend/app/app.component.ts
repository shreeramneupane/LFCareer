import {Component} from 'angular2/core';
import {
    Router,
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PositionListComponent} from './components/position/position.list.component';

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
        component: PositionListComponent
    }
])

export class AppComponent {
    constructor(public router:Router) {
    }
}
