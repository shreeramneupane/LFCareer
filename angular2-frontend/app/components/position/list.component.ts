import {Component, OnInit}         from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Position} from '../../models/position';
import {PositionService}   from '../../services/position.service';

@Component({
  selector   : 'position-list',
  templateUrl: 'app/templates/position/list.component.html',
  directives : [ROUTER_DIRECTIVES],
  providers  : [
    HTTP_PROVIDERS,
    PositionService,
  ]
})

export class PositionListComponent implements OnInit {
  constructor(private _positionListService:PositionService) {
  }

  positions:Position[];

  ngOnInit() {
    this.listPosition();
  }

  listPosition() {
    this._positionListService.listPosition()
    .subscribe(
    positions => this.positions = positions,
    error => toastr.error(error)
    );
  }
}
