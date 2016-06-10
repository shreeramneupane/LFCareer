import {Component} from '@angular/core';

@Component({
  selector: 'portfolios',
  styles  : [require('../applicant-show.component.css')],
  template: require('./portfolios.component.html'),
})

export class Portfolios {
  portfolios:any = [{}, {}];
}
