import { Component, OnInit }              from '@angular/core';
import { ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

import { PageHeader }       from '../../shared/components/page-header/pageHeader.component';
import { Position }         from '../shared/position'
import { PositionService }  from '../shared/position.service';

import * as toastr from 'toastr';

@Component({
  selector  : 'position-show',
  template  : require('./position-show.component.html'),
  providers : [PositionService],
  directives: [ROUTER_DIRECTIVES, PageHeader]
})

export class PositionShowComponent implements OnInit {
  public position:Position;
  public breadCrumb:any = [{name: 'Dashboard', route: ['/App/Dashboard']}, {
    name : 'Position',
    route: ['/App/Position']
  }, {name: 'Details'}];

  constructor(private positionService:PositionService, private routeParams:RouteParams) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.getPosition(id);
  }

  getPosition(id:string) {
    this.positionService.getPosition(id).subscribe(
    response => this.position = response.position,
    error => toastr.error(error)
    );
  }
}
