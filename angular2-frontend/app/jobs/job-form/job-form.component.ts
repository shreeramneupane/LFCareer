import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Control, ControlGroup, Validators }              from '@angular/common';
import { ROUTER_DIRECTIVES }                              from '@angular/router-deprecated';


import { ArrayUtil } from '../../shared/utils/array.util';
import { ControlMessages } from '../../shared/components/control-messages';
import { Job }             from '../shared/job';
import { Position }        from '../../positions/shared/position';
import { PositionService } from '../../positions/shared/position.service';
import { ValidationService } from '../../shared/utils/validation.util';

import * as toastr from 'toastr';

@Component({
  selector  : 'job-form',
  template  : require('./job-form.component.html'),
  providers : [PositionService],
  directives: [ROUTER_DIRECTIVES, ControlMessages]
})

export class JobFormComponent implements OnInit {
  @Input() job:Job;
  @Output() onSubmit = new EventEmitter<Job>();

  submitted:boolean = false;
  positions:any = [];

  a:any = [{title: 'new', default: true}, {title: 'new2', default: true}, {title: 'new3', default: true}, {
    title  : 'new4',
    default: true
  }, {title: 'new10', default: false}];
  b:any = [{title: 'new', default: true}, {title: 'new2', default: true}, {title: 'new3', default: true}, {
    title  : 'new4',
    default: true
  }, {title: 'new10', default: false}, {title: 'new5', default: false}, {title: 'new6', default: false}, {
    title  : 'new7',
    default: false
  }
  ];
  c:any = [];

  formGroup:ControlGroup = new ControlGroup({
    title        : new Control('', Validators.required),
    intro        : new Control('', Validators.required),
    validUntil   : new Control('', Validators.required),
    openings     : new Control('', Validators.compose([Validators.required, ValidationService.positiveNumberValidator])),
    description  : new Control('', Validators.required),
    specification: new Control('', Validators.required)
  });

  constructor(private positionService:PositionService, private arrayUtil:ArrayUtil) {

  }

  ngOnInit() {
    this.getPositions();
    let that:any = this;

    this.c = this.arrayUtil.getDiffFromObjectArrays(this.b, this.a, 'title');
    console.log(this.c)
  }

  ngAfterViewInit() {
    $('#my-select').multiSelect({keepOrder: true});
    $('.ms-list').sortable({cancel: '.default'});
    var that = this;


    console.log(this.c)
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
    let c:any = [];
    $('.ms-list').eq(1).children('li:visible').each(function (value) {
      c.push($(this).children().html())
    });
    console.log(c)
    this.submitted = true;
    if (this.formGroup.valid)
      this.onSubmit.emit(job);
    else
      toastr.error('Please fill the required fields', 'Error!');
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