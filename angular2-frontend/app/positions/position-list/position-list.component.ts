import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Position } from '../shared/position';
import { PositionService }   from '../shared/position.service';

@Component({
  selector   : 'position-list',
  templateUrl: 'app/positions/position-list/position-list.component.html',
  directives : [ROUTER_DIRECTIVES],
  providers  : [PositionService]
})

export class PositionListComponent implements OnInit {
  constructor(private positionListService:PositionService) {
  }

  positions:Position[];

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
