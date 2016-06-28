import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as toastr from 'toastr';

@Component({
  selector: 'interview-stage-remarks',
  styles  : [require('../../../applicant-show.component.css')],
  template: require('./interview-stage-with-remarks.component.html'),
})

export class InterviewRemarks {
  ngOnInit() {
    console.log('remarks');
  }

  @Input() lastTimelineItem;

  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  selectedStage:any = {id: '', remark: ''};


  refreshStage() {
    this.selectedStage.remark = '';
  }

  submitStage() {
    this.selectedStage.id = this.lastTimelineItem.id;
    if (this.selectedStage.remark == '') {
      toastr.error('Please fill the remarks', 'Error!');
    } else {
      this.submit.emit(this.selectedStage);
    }
  }

  cancelEdit() {
    console.log('ssss')
    this.selectedStage.remark = '';
    this.cancel.emit();
  }
}
