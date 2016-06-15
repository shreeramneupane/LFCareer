import {Component} from '@angular/core';
import {
ROUTER_DIRECTIVES,
RouteParams,
Router
} from '@angular/router-deprecated';

import { Achievements } from './achievements/achievements.component.ts';
import { Applicant } from '../shared/applicant';
import { ApplicantService } from '../shared/applicant.service';
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
  directives: [ROUTER_DIRECTIVES, PageHeader, Achievements, Educations, Experiences, GeneralDetails, HiringPipeline, OtherDetails, Portfolios, Profile, References],
  providers: [ApplicantService]
})
export class ApplicantShowComponent {
  applicant:Applicant;
  constructor(private applicantService:ApplicantService, private routeParams:RouteParams) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.getApplicant(id);
  }

  getApplicant(id:string):void {
    this.applicantService.getApplicant(id).subscribe(
    applicant => this.applicant = applicant,
    error => toastr.error(error)
    );
  }
}
