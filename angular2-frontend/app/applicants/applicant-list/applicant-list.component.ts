import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Applicant }        from '../shared/applicant';
import { ApplicantService } from '../shared/applicant.service';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';
import { Pagination } from '../../shared/components/pagination/pagination.component';
import { Sorter } from '../../shared/utils/sort.util';

import * as toastr from 'toastr';
import * as moment from 'moment';

@Component({
  selector  : 'applicant-list',
  template  : require('./applicant-list.component.html'),
  directives: [PageHeader, Pagination, ROUTER_DIRECTIVES],
  providers : [ApplicantService]
})

export class ApplicantListComponent implements OnInit {
  applicants:any = [];
  currentPage:number = 1;
  totalCount:number = 0;
  sorter:any;

  constructor(private applicantService:ApplicantService, private sorterService:Sorter) {
    this.sorter = this.sorterService.getSorterObject(['name', 'appliedFor', 'total_experience', 'created_at']);
  }
  
  ngOnInit() {
    this.listApplicants(1, null);
  }

  getDate(date) {
    return moment(date).format("MMM Do YYYY");
  }

  downloadResume(id:string) {
    this.applicantService.getDocument(id, 'resume').subscribe(
    response => console.log(response),
    error => console.log(error)
    )

  }
  
  listApplicants(page, sortBy) {
    this.applicantService.listApplicants(page, sortBy)
    .subscribe(
    response => {
      this.applicants = response.applicants;
      this.totalCount = response.total_count;
      this.addJobAppliedField();

    },
    error => toastr.error(error)
    );
  }

  addJobAppliedField() {
    this.applicants.map(applicant => {
      if (applicant.direct_apply && applicant.job) {
        applicant.appliedFor = applicant.job + '(Direct Apply)';
      } else if (applicant.direct_apply) {
        applicant.appliedFor = 'Direct Apply';
      } else {
        applicant.appliedFor = applicant.job;
      }
    })
  }

  refreshList(page) {
    this.currentPage = page;
    this.listApplicants(page, this.sorter.sortBy);
  }

  sort(by) {
    this.sorter = this.sorterService.changeClassName(this.sorter, by);
    this.refreshList(this.currentPage);
  }
}