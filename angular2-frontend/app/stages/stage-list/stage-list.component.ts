import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Stage }        from '../shared/stage';
import { StageService } from '../shared/stage.service';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';
import { Pagination } from '../../shared/components/pagination/pagination.component';
import { Sorter } from '../../shared/utils/sort.util';

import * as toastr from 'toastr';

@Component({
  selector  : 'stage-list',
  template  : require('./stage-list.component.html'),
  directives: [ROUTER_DIRECTIVES, PageHeader, Pagination],
  providers : [StageService]
})

export class StageListComponent implements OnInit {
  stages:Stage[];

  currentPage:number = 1;
  totalCount:number = 0;
  sorter:any;

  breadCrumb:any = [{name: 'Dashboard', route: ['/App/Dashboard']}, {name: 'Stages'}];

  constructor(private stageService:StageService, private sorterService:Sorter) {
    this.sorter = this.sorterService.getSorterObject(['title']);
  }

  ngOnInit() {
    this.listStage(1, null);
  }

  listStage(page, sortBy) {
    this.stageService.listStage(page, sortBy)
    .subscribe(
    response => {
      this.stages = response.stages
      this.totalCount = response.total_count || 10
    },
    error => toastr.error(error)
    );
  }

  refreshList(page) {
    this.currentPage = page;
    this.listStage(page, this.sorter.sortBy);
  }

  sort(by) {
    this.sorter = this.sorterService.changeClassName(this.sorter, by);
    this.refreshList(this.currentPage);
  }
}
