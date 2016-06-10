import {Component} from '@angular/core';

@Component({
  selector: 'educations',
  styles  : [require('../applicant-show.component.css')],
  template: require('./educations.component.html'),
})

export class Educations {
  educations:any = [{}, {}];
}
