import { Component, OnInit } from '@angular/core';
import {
ROUTER_DIRECTIVES,
RouteParams,
Router
} from '@angular/router-deprecated';

import { Position }               from '../shared/position';
import { PositionFormComponent }  from '../position-form/position-form.component';
import { PositionService }        from '../shared/position.service';

@Component({
  selector   : 'position-edit',
  templateUrl: 'app/positions/position-edit/position-edit.component.html',
  providers  : [PositionService],
  directives : [ROUTER_DIRECTIVES, PositionFormComponent]
})

export class PositionEditComponent implements OnInit {
  public position:Position;

  constructor(private positionService:PositionService, private routeParams:RouteParams, private router:Router) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.positionService.getPosition(id).subscribe(
    position => this.position = position,
    error => console.log(error)
    );
  }

  onSubmit(position:Position) {
    this.positionService.updatePosition(position)
    .subscribe(
    position => {
      this.router.navigate(['PositionShow', {id: this.position.id}]);
      console.log('Position Updated Successfully!');
    },
    error => toastr.error(error)
    );
  }
}
