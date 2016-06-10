import { Component, OnInit }              from '@angular/core';
import { ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

import { PageHeader }       from '../../shared/components/page-header/pageHeader.component';
import { Position }         from '../shared/position'
import { PositionService }  from '../shared/position.service';

import * as toastr from 'toastr';

@Component({
  selector   : 'position-show',
  template: require('./position-show.component.html'),
  providers  : [PositionService],
  directives : [ROUTER_DIRECTIVES, PageHeader]
})

export class PositionShowComponent implements OnInit {
  public position:Position;

  constructor(private positionService:PositionService, private routeParams:RouteParams) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.getPosition(id);
  }

  getPosition(id:string) {
    this.positionService.getPosition(id).subscribe(
    position => this.position = position,
    error => toastr.error(error)
    );
  }
}
