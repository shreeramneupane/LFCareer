import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router-deprecated';

import { TimelineService } from './timeline.service';
import { Interview } from './interview-stage/interview-stage.component';
import { NonInterview } from './non-interview-stage/non-interview-stage.component';

import { DateUtil } from '../../../shared/utils/date.util';
import { ArrayUtil } from '../../../shared/utils/array.util';

import * as moment from 'moment';
import * as toastr from 'toastr';

@Component({
  selector  : 'timeline',
  styles    : [require('../applicant-show.component.css')],
  template  : require('./timeline.component.html'),
  directives: [Interview, NonInterview],
  providers : [DateUtil, ArrayUtil]
})

export class Timeline implements OnInit {
  //timelines:any = [{}, {}, {}];
  @Input() applicant;

  timeline:any;
  timelineItems:any;
  stages:any;
  selectedStageId:any;
  selectedStage:any;
  lastTimelineItem:any;

  interviewStage:string;
  isInterview:boolean;

  constructor(private timelineService:TimelineService, private dateUtil:DateUtil, private arrayUtil:ArrayUtil, private router:Router) {
  }

  ngOnInit() {
    this.getTimeline(this.applicant.id);

  }

  getTimeline(id:string):void {
    this.timelineService.getTimeline(id).subscribe(
    timeline => {
      this.timeline = timeline;
      this.timelineItems = this.timelineService.filterTimeline(this.timeline, this.applicant);
      this.timelineService.getStages(this.applicant.id)
      .subscribe(
      stages => {
        this.stages = this.timelineService.filterStages(stages, this.timeline);
        this.selectedStageId = this.timelineService.getSelectedStageId(this.stages, this.timeline);
        if (this.selectedStageId) {
          this.changeStage(this.selectedStageId);
        } else if (this.stages.length) {
          this.changeStage(this.timeline[this.timeline.length - 1].stage.id);
        }
      },
      error => toastr.error(error)
      );
    },
    error => toastr.error(error)
    );
  }

  getTodaysDate() {
    return this.dateUtil.getFormattedDate(new Date());
  }

  getAutoCompleteValue(request, response) {
    this.timelineService.getAutoCompleteValue(request.term).subscribe(
    response => console.log(response),
    error => console.log(error)
    );
  }

  changeStage(stageId) {
    this.selectedStageId = stageId;
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
      console.log(this.interviewStage)
    } else {
      this.isInterview = false;
      console.log('flase')
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

  submit(data:any):void {
    let id = 0;
    if (data.mode == 'add') {
      id = this.applicant.id;
    } else if (data.mode == 'edit') {
      console.log(this.lastTimelineItem)
      id = this.lastTimelineItem.interview.id
    }
    this.timelineService.submit(data, id)
    .subscribe(
    response => {
      toastr.success('Stage added');
      this.getTimeline(this.applicant.id);
    }
    )
  }

  cancelEdit() {
    this.interviewStage = 'none';
    this.selectedStageId = 0;
    this.timelineItems.push(this.lastTimelineItem);
  }
}