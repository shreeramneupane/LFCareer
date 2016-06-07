import {Component} from '@angular/core';

import { Achievements } from './achievements/achievements.component.ts';
import { Educations } from './educations/educations.component';
import { Experiences } from './experiences/experiences.component';
import { GeneralDetails } from './general-details/general-details.component';
import { OtherDetails } from './others/others.component';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';
import { Profile } from './profile/profile.component';
import { Portfolios } from './portfolios/portfolios.component';
import { References } from './references/references.component';

@Component({
  selector   : 'applicant-show',
  styleUrls  : ['app/applicants/applicant-show/applicant-show.component.css'],
  templateUrl: 'app/applicants/applicant-show/applicant-show.component.html',
  directives : [PageHeader, Achievements, Educations, Experiences, GeneralDetails, OtherDetails, Portfolios, Profile, References]
})
export class ApplicantShowComponent {
}
