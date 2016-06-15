import { Component, Input, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Applicant } from '../../shared/applicant';
import { ApplicantService } from '../../shared/applicant.service';
import { DateUtil } from '../../../shared/utils/date.util';

import * as toastr from 'toastr';

@Component({
  selector: 'general-details',
  styles  : [require('../applicant-show.component.css')],
  template: require('./general-details.component.html'),
})

export class GeneralDetails implements OnInit {
  @Input() applicant:Applicant;

  constructor(private dateUtil:DateUtil, private routeParams:RouteParams, private applicantService:ApplicantService) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.getPicture(id);
  }

  getPicture(id) {
    this.applicantService.getDocument(id, 'profile_picture')
    .subscribe(
    response => {
      $('.passport-photo')
      .css('content', 'url(' + response.profile_picture + ')');
    },
    error => toastr.error(error)
    )
  }

  downloadResume(){
    let id = this.routeParams.get('id');
    this.applicantService.getDocument(id, 'resume')
    .subscribe(
    response => {
      let link:any = document.getElementsByClassName('download-resume')[0];
      link.href = response.resume;
      link.click();
    },
    error => toastr.error(error)
    )
  }

  getDate(date) {
    return this.dateUtil.getFormattedDate(date);
  }
}
