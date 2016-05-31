import { Component, Host, Input } from '@angular/core';
import { NgFormModel } from '@angular/common';
import { ValidationService } from '../utils/validation.util';

@Component({
  selector: 'control-messages',
  template: `<div class="text-danger" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessages {

  @Input() control:string;
  @Input() submitted:boolean;

  constructor(@Host() private _formDir:NgFormModel) {
  }

  get errorMessage() {
    // Find the control in the Host (Parent) form
    let c = this._formDir.form.find(this.control);

    for (let propertyName in c.errors) {
      if (c.errors.hasOwnProperty(propertyName) && (c.touched || this.submitted)) {
        if (this.submitted)
          this.changeInputFieldBorderColor();
        return ValidationService.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }

  changeInputFieldBorderColor() {
    if ($('#' + this.control).hasClass('ng-untouched')) {
      $('#' + this.control).toggleClass('ng-touched ng-untouched');
    }
  }
}