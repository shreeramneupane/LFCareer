import { Component, Input } from '@angular/core';
import { Applicant } from '../../shared/applicant';

@Component({
  selector: 'profile',
  styles  : [require('../applicant-show.component.css')],
  template: require('./profile.component.html'),
})

export class Profile {
  @Input() applicant:Applicant;
}
