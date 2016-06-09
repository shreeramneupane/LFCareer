import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm }                                 from '@angular/common';
import { ROUTER_DIRECTIVES }                      from '@angular/router-deprecated';

import { Stage } from '../shared/stage';

@Component({
  selector   : 'stage-form',
  template: require('./stage-form.component.html'),
  providers  : [NgForm],
  directives : [ROUTER_DIRECTIVES]
})

export class StageFormComponent {
  @Input() stage:Stage;
  @Output() onSubmit = new EventEmitter<Stage>();

  submit(stage:Stage) {
    this.onSubmit.emit(stage);
  }
}
