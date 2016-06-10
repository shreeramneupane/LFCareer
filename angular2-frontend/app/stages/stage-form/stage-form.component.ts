import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Control, ControlGroup, Validators }      from '@angular/common';
import { ROUTER_DIRECTIVES }                      from '@angular/router-deprecated';

import { ControlMessages } from '../../shared/components/control-messages';
import { Stage }           from '../shared/stage';

@Component({
  selector  : 'stage-form',
  template  : require('./stage-form.component.html'),
  directives: [ROUTER_DIRECTIVES, ControlMessages]
})

export class StageFormComponent {
  @Input() stage:Stage;
  @Output() onSubmit = new EventEmitter<Stage>();

  submitted:boolean = false;

  formGroup:ControlGroup = new ControlGroup({
    name: new Control('', Validators.required)
  });

  submit(stage:Stage) {
    this.submitted = true;
    if (this.formGroup.valid)
      this.onSubmit.emit(stage);
    else
      toastr.error('Please fill the required fields', 'Error!');
  }
}
