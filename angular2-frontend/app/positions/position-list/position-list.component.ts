import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { PageHeader }       from '../../shared/components/page-header/pageHeader.component';
import { Position }         from '../shared/position';
import { PositionService }  from '../shared/position.service';
import { Pagination } from '../../shared/components/pagination/pagination.component';
import { Sorter } from '../../shared/utils/sort.util';


import * as toastr from 'toastr';

@Component({
  selector  : 'position-list',
  template  : require('./position-list.component.html'),
  directives: [ROUTER_DIRECTIVES, PageHeader, Pagination],
  providers : [PositionService]
})

export class PositionListComponent implements OnInit {
  positions:Position[];

  currentPage:number = 1;
  totalCount:number = 0;
  sorter:any;

  breadCrumb:any = [{name: 'Dashboard', route: ['/App/Dashboard']}, {name: 'Positions'}];

  constructor(private positionListService:PositionService, private sorterService:Sorter) {
    this.sorter = this.sorterService.getSorterObject(['title']);
  }

  ngOnInit() {
    this.listPosition(1, null);
  }

  listPosition(page, sortBy) {
    this.positionListService.listPosition(page, sortBy)
    .subscribe(
    response => {
      this.positions = response.positions;
      this.totalCount = response.total_count || 10;
    },
    error => toastr.error(error)
    );
  }

  refreshList(page) {
    this.currentPage = page;
    this.listPosition(page, this.sorter.sortBy);
  }

  sort(by) {
    this.sorter = this.sorterService.changeClassName(this.sorter, by);
    this.refreshList(this.currentPage);
  }
}
