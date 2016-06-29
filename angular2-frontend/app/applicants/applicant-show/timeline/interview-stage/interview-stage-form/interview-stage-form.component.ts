import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as toastr from 'toastr';
import * as moment from 'moment';

import { ArrayUtil } from '../../../../../shared/utils/array.util';
import { ApplicantService } from '../../../../shared/applicant.service';

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

  selectedStage:any = {id: '', title: '', interview: {schedule: '', room: '0', interviewers: []}};
  initialStage:any = {id: '', title: '', interview: {schedule: '', room: '0', interviewers: []}};

  constructor(private arrayUtil:ArrayUtil, private applicantService:ApplicantService) {
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
      placeholderText: 'Interviewer',
      allowSpaces    : true,
      autocomplete   : {
        delay    : 0,
        minLength: 1,
        change   : function (event, ui) {
          console.log('bbbbbbbbbbbbbbbbbb')
        },
        source   : (request, response) => {
          this.getAutoCompleteValue(request, response);
        }
      },
      beforeTagAdded : (event, ui) => {
        let obj = this.arrayUtil.filterObjectByKey(this.suggestions, 'label', ui.tagLabel)[0];

        if (!obj) {
          return false;
        }else {
          this.selectedInterviewers.push(obj);
        }
      },
      beforeTagRemoved: (event, ui) => {
        let obj = this.arrayUtil.filterObjectByKey(this.selectedInterviewers, 'label', ui.tagLabel)[0];
        let index = this.selectedInterviewers.indexOf(obj);
        this.selectedInterviewers.splice(index, 1);
      }
    });

    this.selectedStage.interview.interviewers.forEach((tag) => {
      $('#employees').tagit("createTag", tag);
    })
  }

  getAutoCompleteValue(request, response) {
    this.applicantService.getAutoCompleteValue(request.term)
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
    error => console.log(error)
    )
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
