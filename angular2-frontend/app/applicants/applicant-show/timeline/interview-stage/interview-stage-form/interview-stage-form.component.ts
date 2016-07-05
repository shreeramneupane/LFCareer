import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as toastr from 'toastr';
import * as moment from 'moment';

import { ArrayUtil } from '../../../../../shared/utils/array.util';
import { TimelineService } from '../../timeline.service';
import { ValidationService } from '../../../../../shared/utils/validation.util';

@Component({
  selector : 'interview-stage-form',
  styles   : [require('../../../applicant-show.component.css')],
  template : require('./interview-stage-form.component.html'),
  providers: [ValidationService]
})

export class InterviewForm {
  @Input() stages;
  @Input() selectedStageId;
  @Input() lastTimelineItem;
  @Input() interviewStage;

  @Output() changeStage = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  initialStage:any = {
    id       : '',
    title    : '',
    interview: {schedule: '', meeting_room: '0', interviewers_email: [], from_time: null, to_time: null}
  };
  selectedStage:any = this.initialStage;

  constructor(private arrayUtil:ArrayUtil, private timelineService:TimelineService) {
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
    this.initializeTimePicker();
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

  initializeTimePicker() {
    $('#timepicker1').timepicker({
      defaultTime: this.selectedStage.interview.from_time
    }).on('hide.timepicker', (e:any) => {
      if (!this.selectedStage.interview.from_time) {
        this.selectedStage.interview.from_time = e.target.value;
        this.selectedStage.interview.to_time = moment(this.selectedStage.interview.from_time, 'HH:mm:ss').add(1, 'h').format('hh:mm A');
        $('#timepicker2').timepicker('setTime', this.selectedStage.interview.to_time);

      } else if ((e.time.hours == 12 && e.time.minutes == 0) || this.timelineService.checkTime(e, this.selectedStage.interview.to_time) < 0) {
        this.selectedStage.interview.from_time = e.target.value;
      } else {
        $('#timepicker1').timepicker('setTime', this.selectedStage.interview.from_time);
      }
    });

    $('#timepicker2').timepicker({
      defaultTime: this.selectedStage.interview.to_time
    }).on('hide.timepicker', (e:any) => {
      if (!this.selectedStage.interview.from_time) {
        this.selectedStage.interview.to_time = e.target.value;
        this.selectedStage.interview.from_time = moment(e.time, 'HH:mm:ss').add(-1, 'h').format('hh:mm A');
        $('#timepicker1').timepicker('setTime', this.selectedStage.interview.from_time);
      } else if ((e.time.hours == 12 && e.time.minutes == 0) || this.timelineService.checkTime(e, this.selectedStage.interview.from_time) > 0) {
        this.selectedStage.interview.to_time = e.target.value;
      } else {
        $('#timepicker2').timepicker('setTime', this.selectedStage.interview.to_time);
      }
    });

    $('#timepicker1').click(function () {
      $('#timepicker1').timepicker('showWidget');
    });
    $('#timepicker2').click(function () {
      $('#timepicker2').timepicker('showWidget');
    });
  }

  initializeTag() {
    $("#employees").tagit({
      placeholderText: 'Interviewer',
      allowSpaces    : true,
      autocomplete   : {
        delay    : 0,
        minLength: 1,
        source   : (request, response) => {
          this.getAutoCompleteValue(request, response);
        }
      },
      beforeTagAdded : (event, ui) => {
        if (ValidationService.emailValidator({value: ui.tagLabel})) {
          toastr.error('Please enter valid email', 'Error!');
          return false;
        }
      }
    });

    this.selectedStage.interview.interviewers_email.forEach((tag) => {
      $('#employees').tagit("createTag", tag);
    })
  }

  getAutoCompleteValue(request, response) {
    this.timelineService.getAutoCompleteValue(request.term)
    .subscribe(
    resp => {
      let employees = [];

      resp.data.forEach(employee => {
        employees.push(employee.primaryEmail);
      });
      response(employees);
    },
    error => toastr.error(error)
    )
  }

  changeStageId(stageId) {
    this.selectedStage = this.initialStage;
    this.changeStage.emit(stageId);
  }

  submitStage() {
    this.selectedStage.id = this.selectedStageId;
    this.selectedStage.interview.interviewers_email = $('#employees').tagit('assignedTags');
    if (!this.selectedStage.interview.schedule) {
      toastr.error('Please fill schedule date', 'Error!');
    } else if (!this.selectedStage.interview.interviewers_email.length) {
      toastr.error("Please fill interviewer's email", 'Error!');
    } else {
      let mode = (this.interviewStage == 'edit') ? 'edit' : 'add';
      let requiredStage = {
        schedule          : this.selectedStage.interview.schedule,
        meeting_room      : this.selectedStage.interview.meeting_room,
        interviewers_email: this.selectedStage.interview.interviewers_email,
        from_time         : this.selectedStage.interview.from_time,
        to_time           : this.selectedStage.interview.to_time
      };
      this.submit.emit({stage: (mode == 'edit') ? requiredStage : this.selectedStage, mode: mode});
    }
  }

  cancelEdit(event) {
    this.selectedStage = this.initialStage;
    this.cancel.emit(event);
  }
}