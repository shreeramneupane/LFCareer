import { Component }                  from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { PageHeader }             from '../../shared/page-header/pageHeader.component';
import { Position }               from '../shared/position'
import { PositionFormComponent }  from '../position-form/position-form.component';
import { PositionService }        from '../shared/position.service';

@Component({
  selector   : 'position-new',
  templateUrl: 'app/positions/position-new/position-new.component.html',
  providers  : [PositionService],
  directives : [ROUTER_DIRECTIVES, PositionFormComponent, PageHeader]
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
