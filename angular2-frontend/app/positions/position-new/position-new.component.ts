import { Component }                  from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { PageHeader }             from '../../shared/components/page-header/pageHeader.component';
import { Position }               from '../shared/position'
import { PositionFormComponent }  from '../position-form/position-form.component';
import { PositionService }        from '../shared/position.service';

import * as toastr from 'toastr';

@Component({
  selector  : 'position-new',
  template  : require('./position-new.component.html'),
  providers : [PositionService],
  directives: [ROUTER_DIRECTIVES, PositionFormComponent, PageHeader]
})

export class PositionNewComponent {
  position = this.positionService.newPosition();

  constructor(private positionService:PositionService, private router:Router) {
  }

  onSubmit(position:Position) {
    this.positionService.createPosition(position)
    .subscribe(
    position => {
      this.router.navigate(['PositionList']);
      toastr.success('New Position Created Successfully!');
    },
    error => toastr.error(error)
    );
  }
}
