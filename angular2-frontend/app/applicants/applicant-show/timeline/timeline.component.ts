import { Component, Input, OnInit } from '@angular/core';
import { ApplicantService } from '../../shared/applicant.service';
import { DateUtil } from '../../../shared/utils/date.util';

@Component({
  selector : 'timeline',
  styles   : [require('../applicant-show.component.css')],
  template : require('./timeline.component.html'),
  providers: [ApplicantService, DateUtil]
})

export class Timeline implements OnInit {
  //timelines:any = [{}, {}, {}];
  @Input() timeline;
  @Input() applicant;

  timelineItems:any;
  stages:any;

  constructor(private applicantService:ApplicantService, private dateUtil:DateUtil) {
  }

  ngOnInit() {
    this.timelineItems = this.applicantService.filterTimeline(this.timeline, this.applicant);
    this.stages = this.applicantService.getStages(this.applicant.id)
    .subscribe(
    stages => {
      console.log(stages);
      this.stages = stages
    },
    error => toastr.error(error)
    )
  }
}