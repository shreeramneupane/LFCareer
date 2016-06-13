import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Applicant }        from '../shared/applicant';
import { ApplicantService } from '../shared/applicant.service';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';
import { Pagination } from '../../shared/components/pagination/pagination.component';

import * as toastr from 'toastr';

@Component({
  selector  : 'applicant-list',
  template  : require('./applicant-list.component.html'),
  directives: [PageHeader, Pagination, ROUTER_DIRECTIVES],
  providers : [ApplicantService]
})

export class ApplicantListComponent implements OnInit {
  applicants:any = [];
  currentPage:number = 1;

  constructor(private applicantService:ApplicantService) {
  }
  
  ngOnInit() {
    this.listApplicants(1);
  }
  
  listApplicants(page) {
    this.applicantService.listApplicants(page)
    .subscribe(
    applicants => {
      this.applicants = applicants
    },
    error => toastr.error(error)
    );
  }

  refreshList(page) {
    this.currentPage = page;
    this.listApplicants(page);
  }
}