import { Component }                  from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { Applicant }               from '../shared/applicant'
import { ApplicantFormComponent }  from '../applicant-form/applicant-form.component';
import { ApplicantService }        from '../shared/applicant.service';
import { PageHeader }        from '../../shared/components/page-header/pageHeader.component';

import * as toastr from 'toastr';

@Component({
  selector  : 'applicant-new',
  template  : require('./applicant-new.component.html'),
  providers : [ApplicantService],
  directives: [ROUTER_DIRECTIVES, PageHeader, ApplicantFormComponent]
})

export class ApplicantNewComponent {
  applicant:Applicant = new Applicant();

  constructor(private applicantService:ApplicantService, private router:Router) {
  }

  onSubmit(newApplicant):void {
    console.log(newApplicant.documents);
    this.applicantService.createApplicant(newApplicant.applicant)
    .subscribe(
    response => {
      this.applicantService.uploadDocuments(newApplicant.documents, response.applicant.id)
      .subscribe(
      response => {
        //this.router.navigate(['ApplicantList']);
        toastr.success('New Applicant Created Successfully!');
      },
      error =>toastr.error(error)
      )

    },
    error => toastr.error(error)
    );
  }
}
