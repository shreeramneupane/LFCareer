import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Observable }                     from 'rxjs/Rx';

import { Job }        from '../shared/job';
import { JobService } from '../shared/job.service';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';
import { Pagination } from '../../shared/components/pagination/pagination.component';
import { Sorter } from '../../shared/utils/sort.util';

import * as toastr from 'toastr';

@Component({
  selector  : 'job-list',
  template  : require('./job-list.component.html'),
  directives: [PageHeader, ROUTER_DIRECTIVES, Pagination],
  providers : [JobService]
})

export class JobList implements OnInit {
  jobs:any = [];

  currentPage:number = 1;
  totalCount:number = 0;
  sorter:any;
  apiStatus:string = 'loading';

  breadCrumb:any = [{name: 'Dashboard', route: ['/App/Dashboard']}, {name: 'Jobs'}];

  constructor(private jobService:JobService, private sorterService:Sorter) {
    this.sorter = this.sorterService.getSorterObject(['title', 'number_of_opening']);
  }

  ngOnInit() {
    this.listJobs(1, null);
  }

  listJobs(page, sortBy):any {
    this.jobService.listJobs(page, sortBy)
    .subscribe(
    response => {
      this.apiStatus = (response.jobs.length) ? 'loaded' : 'not-found';
      this.jobs = response.jobs;
      this.totalCount = response.total_count || 10;
    },
    error => {
      toastr.error(error);
      this.apiStatus = 'not-found';
    }
    );
  }

  refreshList(page) {
    this.currentPage = page;
    this.listJobs(page, this.sorter.sortBy);
  }

  sort(by) {
    this.sorter = this.sorterService.changeClassName(this.sorter, by);
    this.refreshList(this.currentPage);
  }
}