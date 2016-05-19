import { Component, OnInit } from '@angular/core';
import {
ROUTER_DIRECTIVES,
RouteParams,
Router
} from '@angular/router-deprecated';

import { Stage }               from '../shared/stage';
import { StageFormComponent }  from '../stage-form/stage-form.component';
import { StageService }        from '../shared/stage.service';

@Component({
  selector   : 'stage-edit',
  templateUrl: 'app/stages/stage-edit/stage-edit.component.html',
  providers  : [StageService],
  directives : [ROUTER_DIRECTIVES, StageFormComponent]
})

export class StageEditComponent implements OnInit {
  public stage:Stage;

  constructor(private stageService:StageService, private routeParams:RouteParams, private router:Router) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.stageService.getStage(id).subscribe(
    stage => this.stage = stage,
    error => toastr.error(error)
    );
  }

  onSubmit(stage:Stage) {
    this.stageService.updateStage(stage)
    .subscribe(
    stage => {
      this.router.navigate(['StageList']);
      toastr.success('Stage Updated Successfully!');
    },
    error => toastr.error(error)
    );
  }
}
