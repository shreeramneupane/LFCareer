import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm }                                 from '@angular/common';
import { ROUTER_DIRECTIVES }                      from '@angular/router-deprecated';

import { Position } from '../shared/position';

@Component({
  selector  : 'position-form',
  template  : require('./position-form.component.html'),
  providers : [NgForm],
  directives: [ROUTER_DIRECTIVES]
})

export class PositionFormComponent {
  @Input() position:Position;
  @Output() onSubmit = new EventEmitter<Position>();

  submit(position:Position) {
    this.onSubmit.emit(position);
  }
}
