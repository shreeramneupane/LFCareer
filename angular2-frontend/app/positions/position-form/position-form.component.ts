import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Control, ControlGroup, Validators }      from '@angular/common';
import { ROUTER_DIRECTIVES }                      from '@angular/router-deprecated';

import { ControlMessages } from '../../shared/components/control-messages';
import { Position }        from '../shared/position';

@Component({
  selector  : 'position-form',
  template  : require('./position-form.component.html'),
  directives: [ROUTER_DIRECTIVES, ControlMessages]
})

export class PositionFormComponent {
  @Input() position:Position;
  @Output() onSubmit = new EventEmitter<Position>();

  submitted:boolean = false;

  formGroup:ControlGroup = new ControlGroup({
    title        : new Control('', Validators.required),
    description  : new Control('', Validators.required),
    specification: new Control('', Validators.required)

  });

  submit(position:Position) {
    this.submitted = true;
    if (this.formGroup.valid)
      this.onSubmit.emit(position);
    else
      toastr.error('Please fill the required fields', 'Error!');
  }
}
