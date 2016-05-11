import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {Position} from '../../models/position'
import {PositionService}   from '../../services/position.service';
import {PositionFormComponent}   from './form.component';

@Component({
  selector   : 'position-new-form',
  templateUrl: 'app/templates/position/new.component.html',
  providers  : [PositionService],
  directives : [ROUTER_DIRECTIVES, PositionFormComponent]
})

export class PositionNewComponent {
  position = this._positionService.newPosition();
  router:Router;

  constructor(private _positionService:PositionService, private _router:Router) {
    this.router = _router;
  }

  onSubmit(position:Position) {
    this._positionService.createPosition(position)
    .subscribe(
    position => {
      this.router.navigate(['Positions']);
      toastr.success('New Position Created Successfully!');
    },
    error => toastr.error(error)
    );
  }
}
