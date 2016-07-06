import { Component, OnInit } from '@angular/core';
import {
ROUTER_DIRECTIVES,
RouteParams,
Router
} from '@angular/router-deprecated';

import { PageHeader }          from '../../shared/components/page-header/pageHeader.component';
import { Stage }               from '../shared/stage';
import { StageFormComponent }  from '../stage-form/stage-form.component';
import { StageService }        from '../shared/stage.service';

import * as toastr from 'toastr';

@Component({
  selector  : 'stage-edit',
  template  : require('./stage-edit.component.html'),
  providers : [StageService],
  directives: [ROUTER_DIRECTIVES, PageHeader, StageFormComponent]
})

export class StageEditComponent implements OnInit {
  public stage:Stage;
  breadCrumb:any = [{name: 'Dashboard', route: ['/App/Dashboard']}, {
    name : 'Stage',
    route: ['/App/Stage']
  }, {name: 'Edit'}];

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
