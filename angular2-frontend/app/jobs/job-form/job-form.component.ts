import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm }                                 from '@angular/common';
import { ROUTER_DIRECTIVES }                      from '@angular/router-deprecated';

import { Job } from '../shared/job';
import { Position } from '../../positions/shared/position';
import { PositionService } from '../../positions/shared/position.service';

@Component({
  selector: 'job-form',
  templateUrl: 'app/jobs/job-form/job-form.component.html',
  providers: [NgForm, PositionService],
  directives: [ROUTER_DIRECTIVES]
})

export class JobFormComponent implements OnInit {
  @Input() job:Job;
  @Output() onSubmit = new EventEmitter<Job>();

  positions:any = [];

  constructor(private positionService:PositionService) {

  }

  ngOnInit() {
    this.getPositions();
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
    let date = new Date(job.valid_until);
    this.job.valid_until =  date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
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