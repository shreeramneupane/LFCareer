import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Stage }        from '../shared/stage';
import { StageService } from '../shared/stage.service';

import { PageHeader } from '../../shared/page-header/pageHeader.component';

@Component({
  selector   : 'stage-list',
  templateUrl: 'app/stages/stage-list/stage-list.component.html',
  directives : [ROUTER_DIRECTIVES, PageHeader],
  providers  : [StageService]
})

export class StageListComponent implements OnInit {
  pageHeader:string = 'Stages List';
  stages:Stage[];

  constructor(private stageService:StageService) {
  }

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
