import {Component} from '@angular/core';

@Component({
  selector: 'experiences',
  styles  : [require('../applicant-show.component.css')],
  template: require('./experiences.component.html'),
})

export class Experiences {
  experiences:any = [{}, {}];
}
