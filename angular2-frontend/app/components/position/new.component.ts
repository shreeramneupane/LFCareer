import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {PositionService}   from '../../services/position.service';
import {PositionFormComponent}   from './form.component';

@Component({
  selector   : 'position-new-form',
  templateUrl: 'app/templates/position/new.component.html',
  providers  : [PositionService],
  directives : [ROUTER_DIRECTIVES, PositionFormComponent]
})

export class PositionNewComponent {
  constructor(private _positionService:PositionService) {
  }

  position  = this._positionService.newPosition();
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
