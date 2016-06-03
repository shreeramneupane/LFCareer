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
  @Input() controlArray:string;

  constructor(@Host() private _formDir:NgFormModel) {
  }

  get errorMessage() {
    // Find the control in the Host (Parent) form
    let c = this.controlArray? this._formDir.form.find(this.controlArray).find(this.control):this._formDir.form.find(this.control);

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
    var id = this.controlArray ? this.controlArray + this.control : this.control;
    if ($('#' + id).hasClass('ng-untouched')) {
      $('#' + id).toggleClass('ng-touched ng-untouched');
    }
  }
}