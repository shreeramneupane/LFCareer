import { Component, Input } from '@angular/core';
import { Applicant } from '../../shared/applicant';

@Component({
  selector: 'other-details',
  styles  : [require('../applicant-show.component.css')],
  template: require('./others.component.html'),
})

export class OtherDetails {
  @Input() applicant:Applicant;
}
