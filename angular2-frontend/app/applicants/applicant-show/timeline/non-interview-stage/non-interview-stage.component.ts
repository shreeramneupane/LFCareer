import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as toastr from 'toastr';

@Component({
  selector: 'non-interview-stage',
  styles  : [require('../../applicant-show.component.css')],
  template: require('./non-interview-stage.component.html'),
})

export class NonInterview {
  @Input() stages;
  @Input() selectedStageId;

  @Output() changeStage = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any, string>();

  selectedStage:any = {
    id    : this.selectedStageId,
    remark: ''
  };

  ngOnInit() {
    console.log('asdf')
  }

  refreshStage() {
    this.selectedStage.remark = '';
  }

  changeStageId(stageId) {
    this.refreshStage(stageId);
    this.changeStage.emit(stageId);
  }

  submitStage() {
    this.selectedStage.id = this.selectedStageId;
    if (this.selectedStage.remark == '') {
      toastr.error('Please fill the remarks', 'Error!');
    } else {
      this.submit.emit({stage: this.selectedStage, mode: 'add'});
    }
  }
}
