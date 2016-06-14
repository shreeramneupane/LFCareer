import { Component, Input } from '@angular/core';
import { Reference } from '../../shared/reference';

@Component({
  selector: 'references',
  styles  : [require('../applicant-show.component.css')],
  template: require('./references.component.html'),
})

export class References {
  @Input() references:Array<Reference>;
}
