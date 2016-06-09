import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { PageHeader }       from '../../shared/components/page-header/pageHeader.component';
import { Position }         from '../shared/position';
import { PositionService }  from '../shared/position.service';

import * as toastr from 'toastr';

@Component({
  selector  : 'position-list',
  template  : require('./position-list.component.html'),
  directives: [ROUTER_DIRECTIVES, PageHeader],
  providers : [PositionService]
})

export class PositionListComponent implements OnInit {
  positions:Position[];

  constructor(private positionListService:PositionService) {
  }

  ngOnInit() {
    this.listPosition();
  }

  listPosition() {
    this.positionListService.listPosition()
    .subscribe(
    positions => this.positions = positions,
    error => toastr.error(error)
    );
  }
}
