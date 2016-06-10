import {Component} from '@angular/core';

@Component({
  selector: 'achievements',
  styles  : [require('../applicant-show.component.css')],
  template: require('./achievements.component.html'),
})

export class Achievements {
  achievements:any = [{}, {}];
}
