import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as toastr from 'toastr';
import * as moment from 'moment';

import { ArrayUtil } from '../../../../../shared/utils/array.util';
import { TimelineService } from '../../timeline.service';

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

  suggestions:any = [];
  selectedInterviewers:any = [];

  selectedStage:any = {id: '', title: '', interview: {schedule: '', meeting_room: '0', interviewers_id: []}};
  initialStage:any = {id: '', title: '', interview: {schedule: '', meeting_room: '0', interviewers_id: []}};

  constructor(private arrayUtil:ArrayUtil, private timelineService:TimelineService) {
  }

  refreshStage() {
    this.selectedStage.interview = {schedule: '', meeting_room: '0', interviewers_id: []};
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
    this.initializeDatePicker();
    this.initializeTag();
  }

  initializeDatePicker() {
    var that = this;
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
  }

  initializeTag() {
    $("#employees").tagit({
      placeholderText : 'Interviewer',
      allowSpaces     : true,
      autocomplete    : {
        delay    : 0,
        minLength: 1,
        source   : (request, response) => {
          this.getAutoCompleteValue(request, response);
        }
      },
      beforeTagAdded  : (event, ui) => {
        let obj = this.arrayUtil.filterObjectByKey(this.suggestions, 'label', ui.tagLabel)[0];
        if (!obj) {
          return false;
        } else {
          this.selectedInterviewers.push(obj);
        }
      },
      beforeTagRemoved: (event, ui) => {
        let obj = this.arrayUtil.filterObjectByKey(this.selectedInterviewers, 'label', ui.tagLabel)[0];
        let index = this.selectedInterviewers.indexOf(obj);
        this.selectedInterviewers.splice(index, 1);
      }
    });
    this.suggestions = this.selectedStage.interview.interviewers || [];
    this.arrayUtil.changeKeyName(this.suggestions, 'name', 'label');

    this.suggestions.forEach((tag) => {
      $('#employees').tagit("createTag", tag.label);
    })
  }

  getAutoCompleteValue(request, response) {
    this.timelineService.getAutoCompleteValue(request.term)
    .subscribe(
    resp => {
      let employees = [];
      resp.data.forEach(employee => {
        let middleName = (employee.middleName == 'NULL' || !employee.middleName) ? '' : employee.middleName + ' ';
        let newEmployee = {
          id   : employee.id,
          label: employee.firstName + ' ' + middleName + employee.lastName
        };
        employees.push(newEmployee);
      });
      this.suggestions = employees;
      response(employees);
    },
    error => toastr.error(error)
    )
  }

  changeStageId(stageId) {
    this.refreshStage();
    this.changeStage.emit(stageId);
  }

  submitStage() {
    this.selectedStage.id = this.selectedStageId;
    this.selectedStage.interview.interviewers_id = this.selectedInterviewers.map(interviewer => {
      return interviewer.id;
    });
    if (!this.selectedStage.interview.schedule || !this.selectedStage.interview.interviewers_id.length) {
      toastr.error('Please fill required data', 'Error!');
    } else {
      let mode = (this.interviewStage == 'edit') ? 'edit' : 'add';
      let requiredStage = {
        schedule       : this.selectedStage.interview.schedule,
        meeting_room   : this.selectedStage.interview.meeting_room,
        interviewers_id: this.selectedStage.interview.interviewers_id
      };

      this.submit.emit({stage: (mode == 'edit') ? requiredStage : this.selectedStage, mode: mode});
    }
  }

  cancelEdit(event) {
    this.selectedStage = this.initialStage;
    this.cancel.emit(event);
  }
}
