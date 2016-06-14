import { Component, Input } from '@angular/core';
import { Education } from '../../shared/education';

@Component({
  selector: 'educations',
  styles  : [require('../applicant-show.component.css')],
  template: require('./educations.component.html'),
})

export class Educations {
  @Input() educations:Array<Education>;
}
