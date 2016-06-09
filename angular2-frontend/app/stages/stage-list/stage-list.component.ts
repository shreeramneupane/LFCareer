import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Stage }        from '../shared/stage';
import { StageService } from '../shared/stage.service';

import { PageHeader } from '../../shared/components/page-header/pageHeader.component';

import * as toastr from 'toastr';

@Component({
  selector  : 'stage-list',
  template  : require('./stage-list.component.html'),
  directives: [ROUTER_DIRECTIVES, PageHeader],
  providers : [StageService]
})

export class StageListComponent implements OnInit {
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
