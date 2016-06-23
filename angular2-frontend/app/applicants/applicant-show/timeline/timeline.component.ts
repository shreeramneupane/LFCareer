import { Component, Input, OnInit } from '@angular/core';
import { ApplicantService } from '../../shared/applicant.service';
import { DateUtil } from '../../../shared/utils/date.util';
import { ArrayUtil } from '../../../shared/utils/array.util';

import * as moment from 'moment';

@Component({
  selector : 'timeline',
  styles   : [require('../applicant-show.component.css')],
  template : require('./timeline.component.html'),
  providers: [ApplicantService, DateUtil, ArrayUtil]
})

export class Timeline implements OnInit {
  //timelines:any = [{}, {}, {}];
  @Input() timeline;
  @Input() applicant;

  timelineItems:any;
  stages:any;
  selectedStageId:any;
  selectedStage:any;

  constructor(private applicantService:ApplicantService, private dateUtil:DateUtil, private arrayUtil:ArrayUtil) {
  }

  ngOnInit() {
    this.timelineItems = this.applicantService.filterTimeline(this.timeline, this.applicant);
    this.applicantService.getStages(this.applicant.id)
    .subscribe(
    stages => {
      this.stages = this.applicantService.filterStages(stages, this.timeline);
      this.selectedStageId = this.applicantService.getSelectedStageId(this.stages, this.timeline);
    },
    error => toastr.error(error)
    );
  }

  ngAfterViewChecked() {
    var that = this;
    $('#datepicker').datepicker({
      format   : 'yyyy/mm/dd',
      startDate: new Date(),
      autoclose: true
    }).on('changeDate', function () {
      that.selectedStage.date = $('#scheduledDate').val();
    });
    $("#employees").tagit({
      autocomplete: {
        delay: 0, minLength: 1, source: function (request, response) {
          that.getAutoCompleteValue(request, response);
        }
      }
    });
  }

  getTodaysDate() {
    return this.dateUtil.getFormattedDate(new Date());
  }

  getAutoCompleteValue(request, response) {
    this.applicantService.getAutoCompleteValue(request.term).subscribe(
    response => console.log(response),
    error => console.log(error)
    );
  }

  changeStage(stage) {
    this.selectedStage = {};
    let newStage = this.arrayUtil.filterObjectByKey(this.stages, 'id', stage);
    this.selectedStage.id = newStage[0].id;
    console.log(newStage)
    if (newStage[0].is_interview == true) {
      this.selectedStage.date = moment().format('YYYY/MM/DD');;
      this.selectedStage.interviewers = [];
      this.selectedStage.meetingRoom = '';
    }
  }
}