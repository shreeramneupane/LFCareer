import { Component, Input, OnInit } from '@angular/core';
import { ApplicantService } from '../../shared/applicant.service';
import { Interview } from './interview-stage/interview-stage.component';
import { NonInterview } from './non-interview-stage/non-interview-stage.component';

import { DateUtil } from '../../../shared/utils/date.util';
import { ArrayUtil } from '../../../shared/utils/array.util';

import * as moment from 'moment';

@Component({
  selector  : 'timeline',
  styles    : [require('../applicant-show.component.css')],
  template  : require('./timeline.component.html'),
  directives: [Interview, NonInterview],
  providers : [DateUtil, ArrayUtil]
})

export class Timeline implements OnInit {
  //timelines:any = [{}, {}, {}];
  @Input() timeline;
  @Input() applicant;

  timelineItems:any;
  stages:any;
  selectedStageId:any;
  selectedStage:any;

  isInterview:boolean;

  constructor(private applicantService:ApplicantService, private dateUtil:DateUtil, private arrayUtil:ArrayUtil) {
  }

  ngOnInit() {
    this.timelineItems = this.applicantService.filterTimeline(this.timeline, this.applicant);
    this.applicantService.getStages(this.applicant.id)
    .subscribe(
    stages => {
      this.stages = this.applicantService.filterStages(stages, this.timeline);
      this.selectedStageId = this.applicantService.getSelectedStageId(this.stages, this.timeline);
      this.checkStage(this.timeline[this.timeline.length - 1].stage);
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
      placeholderText: 'Interviewer',
      allowSpaces    : true,
      autocomplete   : {
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

  changeStage(stageId) {
    /*this.selectedStage = {};
     let newStage = this.arrayUtil.filterObjectByKey(this.stages, 'id', stage);
     this.selectedStage.id = newStage[0].id;
     if (newStage[0].is_interview == true) {
     this.selectedStage.date = moment().format('YYYY/MM/DD');;
     this.selectedStage.interviewers = [];
     this.selectedStage.room = '';
     }*/
    let stage = this.arrayUtil.filterObjectByKey(this.stages, 'id', stageId)[0];
    this.checkStage(stage);
  }

  checkStage(stage:any):void {
    if (stage.is_interview == true) {
      this.isInterview = true;
    } else {
      this.isInterview = false;
    }
  }

  submit(stage:any):void {
    console.log('submitted');
  }
}