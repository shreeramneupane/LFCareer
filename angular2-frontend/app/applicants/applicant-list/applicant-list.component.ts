import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { Applicant }        from '../shared/applicant';
import { ApplicantService } from '../shared/applicant.service';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';

@Component({
  selector   : 'applicant-list',
  templateUrl: 'app/applicants/applicant-list/applicant-list.component.html',
  directives : [PageHeader, ROUTER_DIRECTIVES],
  providers  : [ApplicantService]
})

export class ApplicantListComponent implements OnInit {
  applicants:any = [];
  
  constructor(private applicantService:ApplicantService) {
  }
  
  ngOnInit() {
    this.listApplicants();
  }
  
  listApplicants() {
    this.applicantService.listApplicants()
    .subscribe(
    applicants => this.applicants = applicants,
    error => toastr.error(error)
    );
  }
}