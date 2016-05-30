import { Component }                  from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { Applicant }               from '../shared/applicant'
import { ApplicantFormComponent }  from '../applicant-form/applicant-form.component';
import { ApplicantService }        from '../shared/applicant.service';
import { PageHeader }        from '../../shared/components/page-header/pageHeader.component';

@Component({
  selector: 'applicant-new',
  templateUrl: 'app/applicants/applicant-new/applicant-new.component.html',
  providers: [ApplicantService],
  directives: [ROUTER_DIRECTIVES, PageHeader, ApplicantFormComponent]
})

export class ApplicantNewComponent {
  applicant:Applicant = new Applicant();

  constructor(private applicantService:ApplicantService, private router:Router) {
  }

  onSubmit(applicant:Applicant):void {
    console.log('submitted');
    /*this.applicantService.createApplicant(applicant)
    .subscribe(
    applicant => {
      this.router.navigate(['ApplicantList']);
      toastr.success('New Applicant Created Successfully!');
    },
    error => toastr.error(error)
    );*/
  }
}
