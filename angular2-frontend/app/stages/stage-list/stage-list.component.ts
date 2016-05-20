import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Stage } from '../shared/stage';
import { StageService }   from '../shared/stage.service';

@Component({
  selector   : 'stage-list',
  templateUrl: 'app/stages/stage-list/stage-list.component.html',
  directives : [ROUTER_DIRECTIVES],
  providers  : [StageService]
})

export class StageListComponent implements OnInit {
  constructor(private stageService:StageService) {
  }

  stages:Stage[];

  ngOnInit() {
    this.listStage();
  }

  listStage() {
    this.stageService.listStage()
    .subscribe(
    stages => this.stages = stages,
    error => toastr.error(error)
    );
  }
}
