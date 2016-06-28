import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as toastr from 'toastr';
import * as moment from 'moment';

import { ArrayUtil } from '../../../../../shared/utils/array.util';

@Component({
  selector: 'interview-stage-form',
  styles  : [require('../../../applicant-show.component.css')],
  template: require('./interview-stage-form.component.html'),
})

export class InterviewForm {
  @Input() stages;
  @Input() selectedStageId;
  @Input() lastTimelineItem;
  @Input() interviewStage;
  @Output() changeStage = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  selectedStage:any = {id: '', title: '', interview: {schedule: '', room: '0', interviewers: []}};
  initialStage:any = {id: '', title: '', interview: {schedule: '', room: '0', interviewers: []}};

  constructor(private arrayUtil:ArrayUtil) {
  }

  refreshStage() {
    this.selectedStage.interview = {schedule: '', room: '0', interviewers: []};
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.interviewStage == 'edit') {
      this.selectedStage = ({}, this.lastTimelineItem);
      this.selectedStage = jQuery.extend(true, {}, this.lastTimelineItem);
      this.initialStage = jQuery.extend(true, {}, this.lastTimelineItem);
    } else {
      this.selectedStage.title = this.arrayUtil.filterObjectByKey(this.stages, 'id', this.selectedStageId)[0].title;
    }
    var that = this;
    console.log(new Date('2016-06-21T11:14:05.415Z'))
    console.log(new Date())
    $('#datepicker').datepicker({
      format   : 'yyyy/mm/dd',
      startDate: new Date(),
      autoclose: true
    }).on('changeDate', function () {
      that.selectedStage.interview.schedule = $('#scheduledDate').val();
    });
    if (this.interviewStage == 'edit') {
      $('#datepicker').datepicker('setDate', new Date(this.selectedStage.interview.schedule));
    } else {
      $('#datepicker').datepicker('setDate', new Date());
    }
    $("#employees").tagit({
      placeholderText: 'Interviewer',
      allowSpaces    : true,
      /*autocomplete   : {
       delay: 0, minLength: 1, source: function (request, response) {
       that.getAutoCompleteValue(request, response);
       }
       }*/
    });
    this.selectedStage.interview.interviewers.forEach((tag) => {
      $('#employees').tagit("createTag", tag);
    })
  }

  changeStageId(stageId) {
    this.refreshStage(stageId);
    this.changeStage.emit(stageId);
  }

  submitStage() {
    this.selectedStage.id = this.selectedStageId;
    this.selectedStage.interview.interviewers = $('#employees').tagit('assignedTags');
    if (!this.selectedStage.interview.schedule || !this.selectedStage.interview.interviewers.length) {
      toastr.error('Please fill required data', 'Error!');
    } else {
      this.submit.emit(this.selectedStage);
    }
  }

  cancelEdit() {
    console.log('ssss')
    this.selectedStage = this.initialStage;
    this.cancel.emit();
  }
}
