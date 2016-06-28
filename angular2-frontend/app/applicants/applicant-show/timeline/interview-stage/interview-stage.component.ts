import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InterviewForm } from './interview-stage-form/interview-stage-form.component';
import { InterviewRemarks } from './interview-stage-with-remarks/interview-stage-with-remarks.component';
@Component({
  selector  : 'interview-stage',
  styles    : [require('../../applicant-show.component.css')],
  template  : require('./interview-stage.component.html'),
  directives: [InterviewForm, InterviewRemarks]
})

export class Interview {
  @Input() stages;
  @Input() selectedStageId;
  @Input() interviewStage;
  @Input() lastTimelineItem;

  @Output() changeStage = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  ngOnInit() {
    console.log('interview')
  }
  refreshStage() {
    this.selectedStage.remark = '';
  }

  changeStageId(stageId) {
    this.refreshStage(stageId);
    this.changeStage.emit(stageId);
  }

  submitStage(stage:any) {
    /*this.selectedStage.id = this.selectedStageId;
     if (this.selectedStage.remark == '') {
     toastr.error('Please fill the remarks', 'Error!');
     } else {*/
    console.log('ssss')
    this.submit.emit(stage);
    //}
  }

  cancelEdit() {
    this.cancel.emit();
  }
}
