import { Component, OnInit } from '@angular/core';
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
import { Timeline } from './timeline/timeline.component';

@Component({
  selector  : 'applicant-show',
  styles    : [require('./applicant-show.component.css')],
  template  : require('./applicant-show.component.html'),
  directives: [ROUTER_DIRECTIVES, PageHeader, Achievements, Educations, Experiences, GeneralDetails, HiringPipeline, OtherDetails, Portfolios, Profile, References, Timeline],
  providers : [ApplicantService]
})
export class ApplicantShowComponent implements OnInit {
  applicant:Applicant;
  timeline:any;

  constructor(private applicantService:ApplicantService, private routeParams:RouteParams) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.getApplicant(id);
    this.getTimeline(id);
  }

  getApplicant(id:string):void {
    this.applicantService.getApplicant(id).subscribe(
    applicant => this.applicant = applicant,
    error => toastr.error(error)
    );
  }

  getTimeline(id:string):void {
    this.applicantService.getTimeline(id).subscribe(
    timeline => this.timeline = timeline,
    error => toastr.error(error)
    );
  }

  startTimeline(timeline:any):void {
    this.applicantService.startTimeline(timeline, this.applicant.id)
    .subscribe(
    applicant => {
      this.applicant = applicant;
      this.getTimeline(applicant.id);
    },
    error => taostr.error(error)
    );
  }
}
