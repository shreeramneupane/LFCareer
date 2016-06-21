import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Control, ControlGroup, Validators }              from '@angular/common';
import { ROUTER_DIRECTIVES }                              from '@angular/router-deprecated';


import { ArrayUtil } from '../../shared/utils/array.util';
import { ControlMessages } from '../../shared/components/control-messages';
import { Job }             from '../shared/job';
import { JobService } from '../shared/job.service';
import { Position }        from '../../positions/shared/position';
import { PositionService } from '../../positions/shared/position.service';
import { StageService } from '../../stages/shared/stage.service';
import { ValidationService } from '../../shared/utils/validation.util';

import * as toastr from 'toastr';

@Component({
  selector  : 'job-form',
  template  : require('./job-form.component.html'),
  providers : [PositionService, StageService],
  directives: [ROUTER_DIRECTIVES, ControlMessages]
})

export class JobFormComponent implements OnInit {
  @Input() job:Job;
  @Input() stages:Array<any>;
  @Output() onSubmit = new EventEmitter<Job>();

  submitted:boolean = false;
  positions:any = [];
  //stages:any = [];
  notSelectedStages:any = [];
  formGroup:ControlGroup = new ControlGroup({
    title        : new Control('', Validators.required),
    intro        : new Control('', Validators.required),
    validUntil   : new Control('', Validators.required),
    openings     : new Control('', Validators.compose([Validators.required, ValidationService.positiveNumberValidator])),
    description  : new Control('', Validators.required),
    specification: new Control('', Validators.required)
  });

  constructor(private arrayUtil:ArrayUtil, private jobService:JobService, private positionService:PositionService, private stageService:StageService) {

  }

  ngOnInit() {
    this.getPositions();
    this.jobService.sortByPrecedence(this.job.stages);
    this.notSelectedStages = this.arrayUtil.getDiffFromObjectArrays(this.stages, this.job.stages, 'id')
  }

  ngAfterViewInit() {
    $('#my-select').multiSelect({keepOrder: true});
    $('.ms-list').sortable({cancel: '.default', axis: 'y'});
    var that = this;
    $('#datepicker').datepicker({
      format   : 'yyyy/mm/dd',
      startDate: new Date(),
      autoclose: true
    }).on('changeDate', function () {
      that.job.valid_until = $('#validUntil').val();
    });
  }

  getPositions() {
    this.positionService.listPosition()
    .subscribe(
    response => {
      let positions = response.positions;
      this.positions = positions;
      if (positions.length) {
        this.job.position_id = this.job.position_id ? this.job.position_id : positions[0].id;
        this.job.specification = this.job.specification ? this.job.specification : positions[0].specification;
        this.job.description = this.job.description ? this.job.description : positions[0].description;
      }
    },
    error => toastr.error(error)
    );
  }


  submit(job:Job) {
    let arrangedStages:any = [];
    let counter:number = 1;

    this.submitted = true;
 /*   if (this.formGroup.valid) {
      $('.ms-list').eq(1).children('li:visible').each(function () {
        arrangedStages.push({id: $(this).children().attr('id'), precedence_number: counter, title: $(this).children().html()});
        counter++;
      });
      job.stages = arrangedStages;
      console.log(job.stages)
 */     this.onSubmit.emit(job);
    /* }
     else
     toastr.error('Please fill the required fields', 'Error!');*/
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