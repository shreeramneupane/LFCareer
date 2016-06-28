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
  //@Input() stages;
  //@Input() selectedStageId;
  /*@Input()
   @Output() changeStage = new EventEmitter<any>();
   @Output() submit = new EventEmitter<any>();

   refreshStage() {
   this.selectedStage.remark = '';
   }

   changeStageId(stageId) {
   this.refreshStage(stageId);
   this.changeStage.emit(stageId);
   }

   submitStage() {
   /!*this.selectedStage.id = this.selectedStageId;
   if (this.selectedStage.remark == '') {
   toastr.error('Please fill the remarks', 'Error!');
   } else {*!/
   this.submit.emit(this.selectedStage);
   //}
   }*/
}
