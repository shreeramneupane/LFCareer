import {Component} from '@angular/core';

import { PageHeader } from '../../shared/components/page-header/pageHeader.component';
@Component({
  selector   : 'applicant-show',
  styleUrls  : ['app/applicants/applicant-show/applicant-show.component.css'],
  templateUrl: 'app/applicants/applicant-show/applicant-show.component.html',
  directives: [PageHeader]
})
export class ApplicantShowComponent {
}
