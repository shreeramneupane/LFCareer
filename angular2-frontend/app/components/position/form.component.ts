import {Component, Input} from '@angular/core';
import {NgForm}    from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Position} from '../../models/position';

@Component({
  selector: 'position-form',
  templateUrl: 'app/templates/position/form.component.html',
  providers: [NgForm],
  directives: [ROUTER_DIRECTIVES]
})

export class PositionFormComponent {
  @Input()
  position:Position;
}
