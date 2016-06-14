import {Component} from '@angular/core';

import { Achievements } from './achievements/achievements.component.ts';
import { Educations } from './educations/educations.component';
import { Experiences } from './experiences/experiences.component';
import { GeneralDetails } from './general-details/general-details.component';
import { HiringPipeline } from './hiring-pipeline/hiring-pipeline.component';
import { OtherDetails } from './others/others.component';
import { PageHeader } from '../../shared/components/page-header/pageHeader.component';
import { Profile } from './profile/profile.component';
import { Portfolios } from './portfolios/portfolios.component';
import { References } from './references/references.component';

@Component({
  selector  : 'applicant-show',
  styles    : [require('./applicant-show.component.css')],
  template  : require('./applicant-show.component.html'),
  directives: [PageHeader, Achievements, Educations, Experiences, GeneralDetails, HiringPipeline, OtherDetails, Portfolios, Profile, References]
})
export class ApplicantShowComponent {
}
