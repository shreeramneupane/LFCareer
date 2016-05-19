import { Component } from '@angular/core';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {
Router,
ROUTER_DIRECTIVES
} from '@angular/router-deprecated';

@Component({
  selector: 'sidebar',
  templateUrl: 'app/components/commons/sidebar/sidebar.component.html',
  directives: [
    ROUTER_DIRECTIVES
  ]
})

export class Sidebar {
  constructor(public router:Router) {
  }
}