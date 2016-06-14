import {Component, Input} from '@angular/core';
import { Experience } from '../../shared/experience';
import { DateUtil } from '../../../shared/utils/date.util';
@Component({
  selector: 'experiences',
  styles  : [require('../applicant-show.component.css')],
  template: require('./experiences.component.html'),
})

export class Experiences {
  @Input() experiences:any;
  constructor(private dateUtil:DateUtil){

  }

}
