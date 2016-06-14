import { Input, Component } from '@angular/core';
import { Portfolio } from '../../shared/portfolio';
@Component({
  selector: 'portfolios',
  styles  : [require('../applicant-show.component.css')],
  template: require('./portfolios.component.html'),
})

export class Portfolios {
  @Input() portfolios:Array<Portfolio>;
}
