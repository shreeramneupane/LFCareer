import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as toastr from 'toastr';

@Component({
  selector: 'interview-stage-remarks',
  styles  : [require('../../../applicant-show.component.css')],
  template: require('./interview-stage-with-remarks.component.html'),
})

export class InterviewRemarks {
  @Input() lastTimelineItem;

  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  selectedStage:any = {applicant_stage_id: '', remark: ''};
  remarks = [{
    id               : 'asdfsdfsdfsdf',
    email            : 'bishalshrestha@lftechnology.com',
    rating           : 7,
    remark           : 'He is very good and we cannot find better than him',
    furtherProcessing: 'true'
  }, {
    id               : 'slkdjflksjdfsdlfj',
    email            : 'shreeramneupane@lftechnology.com',
    rating           : 7,
    remark           : 'He is average and we can find better than him',
    furtherProcessing: 'false'
  }];

  remarkKeys = Object.keys(this.remarks[0]);

  refreshStage() {
    this.selectedStage.remark = '';
  }

  submitStage() {
    this.selectedStage.applicant_stage_id = this.lastTimelineItem.id;
    if (this.selectedStage.remark == '') {
      toastr.error('Please fill the remarks', 'Error!');
    } else {
      this.submit.emit({stage: this.selectedStage, mode: 'add remarks'});
    }
  }

  cancelEdit(event) {
    this.selectedStage.remark = '';
    this.cancel.emit(event);
  }
}
