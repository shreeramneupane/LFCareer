import { Component, Input }    from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
  selector: 'breadCrumb',
  template: require('./breadCrumb.component.html'),
  directives: [ROUTER_DIRECTIVES]
})

export class BreadCrumbComponent {
  @Input() breadCrumb;
}