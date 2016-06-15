import { Component, Input } from '@angular/core';
import { Achievement } from '../../shared/achievement';

@Component({
  selector: 'achievements',
  styles  : [require('../applicant-show.component.css')],
  template: require('./achievements.component.html'),
})

export class Achievements {
  @Input() achievements:Array<Achievement>;
}
