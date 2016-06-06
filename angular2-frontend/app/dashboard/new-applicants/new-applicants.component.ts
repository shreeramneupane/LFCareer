import { Component, Input } from '@angular/core';

import { Applicant } from '../../applicants/applicant-list/applicant';

@Component({
  selector   : 'new-applicants',
  templateUrl: 'app/dashboard/new-applicants/new-applicants.component.html',
})

export class NewApplicantsComponent {
  @Input() applicants:Array<Applicant>;
}
