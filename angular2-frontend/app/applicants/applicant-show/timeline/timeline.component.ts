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
  lastTimelineItem:any;

  interviewStage:string;
  isInterview:boolean;

  constructor(private applicantService:ApplicantService, private dateUtil:DateUtil, private arrayUtil:ArrayUtil) {
  }

  ngOnInit() {
    this.timeline.push({
      "id"          : "0cb0fd80-384a-11e6-876d-9bedf7bd240e",
      "applicant_id": "0c816200-384a-11e6-876d-9bedf7bd240f",
      "stage_id"    : "44286860-37a1-11e6-85ed-457d7aa2735b",
      "created_at"  : "2016-06-22T07:22:17.304Z",
      "updated_at"  : "2016-06-22T07:22:17.304Z",
      "stage"       : {
        "id"               : "44286860-37a1-11e6-85ed-457d7aa2735b",
        "title"            : "Face to Face Interview",
        "is_default"       : true,
        "is_repeatable"    : true,
        "is_termination"   : false,
        "is_interview"     : true,
        "precedence_number": 2,
        "created_at"       : "2016-06-21T11:14:05.415Z",
        "updated_at"       : "2016-06-21T11:14:05.415Z"
      },
      "interview"   : {
        "schedule"    : '2016-07-21T11:14:05.415Z',
        "room"        : 'Manakamana',
        "interviewers": ["Bishal"]
      }
    })
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
      if (this.timelineItems[this.timelineItems.length - 1].has_button) {
        this.interviewStage = 'none';
      } else {
        this.interviewStage = 'add';
      }
    } else {
      this.isInterview = false;
    }
  }

  editSchedule():void {
    this.interviewStage = 'edit';
    this.lastTimelineItem = this.timelineItems[this.timelineItems.length - 1];
    this.timelineItems.splice(this.timelineItems.length - 1, 1);
    this.selectedStageId = this.timeline[this.timeline.length - 1].stage.id;
  }

  addRemarks():void {
    this.interviewStage = 'addRemarks';
    this.lastTimelineItem = this.timelineItems[this.timelineItems.length - 1];
    this.timelineItems.splice(this.timelineItems.length - 1, 1);
    this.selectedStageId = this.timeline[this.timeline.length - 1].stage.id;
  }

  submit(stage:any):void {
    console.log(stage);
  }

  cancelEdit() {
    this.interviewStage = 'none';
    this.selectedStageId = 0;
    this.timelineItems.push(this.lastTimelineItem);
  }
}