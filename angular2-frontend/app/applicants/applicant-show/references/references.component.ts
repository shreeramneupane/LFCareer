import {Component} from '@angular/core';

@Component({
  selector: 'references',
  styles  : [require('../applicant-show.component.css')],
  template: require('./references.component.html'),
})

export class References {
  references:any = [{}, {}];
}
