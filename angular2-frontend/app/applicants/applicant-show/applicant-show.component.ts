import { Component, OnInit } from '@angular/core';
import {
ROUTER_DIRECTIVES,
RouteParams,
Router
} from '@angular/router-deprecated';
import * as toastr from 'toastr';

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
import { TimelineService } from './timeline/timeline.service';

@Component({
  selector  : 'applicant-show',
  styles    : [require('./applicant-show.component.css')],
  template  : require('./applicant-show.component.html'),
  directives: [ROUTER_DIRECTIVES, PageHeader, Achievements, Educations, Experiences, GeneralDetails, HiringPipeline, OtherDetails, Portfolios, Profile, References, Timeline],
  providers : [ApplicantService, TimelineService]
})
export class ApplicantShowComponent implements OnInit {
  applicant:Applicant;
  timeline:any;

  breadCrumb:any = [{name: 'Dashboard', route: ['/App/Dashboard']}, {
    name : 'Applicant',
    route: ['/App/Applicant']
  }, {name: 'Details'}];

  constructor(private applicantService:ApplicantService, private timelineService:TimelineService, private routeParams:RouteParams) {
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

  startTimeline(timeline:any):void {
    this.timelineService.startTimeline(timeline, this.applicant.id)
    .subscribe(
    response => {
      this.applicant = response.applicant;
    },
    error => toastr.error(error)
    );
  }
}
