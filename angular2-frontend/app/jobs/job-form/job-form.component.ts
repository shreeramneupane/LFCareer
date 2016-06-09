import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm }                                         from '@angular/common';
import { ROUTER_DIRECTIVES }                              from '@angular/router-deprecated';

import { Job }             from '../shared/job';
import { Position }        from '../../positions/shared/position';
import { PositionService } from '../../positions/shared/position.service';

import * as toastr from 'toastr';

@Component({
  selector  : 'job-form',
  template  : require('./job-form.component.html'),
  providers : [NgForm, PositionService],
  directives: [ROUTER_DIRECTIVES]
})

export class JobFormComponent {
  @Input() job:Job;
  @Output() onSubmit = new EventEmitter<Job>();

  positions:any = [];

  constructor(private positionService:PositionService) {

  }

  ngOnInit() {
    this.getPositions();
  }

  ngAfterViewInit() {
    var that = this;
    $('#datepicker').datepicker({format: 'yyyy/mm/dd', autoclose: true}).on('changeDate', function () {
      that.job.valid_until = $('#datepicker-input').val();
    });
  }

  getPositions() {
    this.positionService.listPosition()
    .subscribe(
    positions => {
      this.positions = positions;
      this.job.position_id = this.job.position_id ? this.job.position_id : positions[0].id;
      this.job.specification = this.job.specification ? this.job.specification : positions[0].specification;
      this.job.description = this.job.description ? this.job.description : positions[0].description;
    },
    error => toastr.error(error)
    );
  }

  submit(job:Job) {
    this.onSubmit.emit(job);
  }

  changeSpecAndDescription(value) {
    this.positions.forEach(position => {
      if (position.id == value) {
        this.job.specification = position.specification;
        this.job.description = position.description;
      }
    });
  }
}