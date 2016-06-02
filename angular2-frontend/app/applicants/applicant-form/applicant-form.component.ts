import { Component, EventEmitter, Input, Output, OnInit }  from '@angular/core';
import { Control, ControlArray, ControlGroup, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES }                               from '@angular/router-deprecated';

import { Achievement } from '../shared/achievement';
import { Applicant }       from '../shared/applicant';
import { ControlMessages } from '../../shared/components/control-messages';
import { Education } from '../shared/education';
import { Experience } from  '../shared/experience';
import { Portfolio } from '../shared/portfolio';
import { Reference } from '../shared/reference';

import { ValidationService } from '../../shared/utils/validation.util';
@Component({
  selector   : 'applicant-form',
  templateUrl: 'app/applicants/applicant-form/applicant-form.component.html',
  styleUrls  : ['app/applicants/applicant-form/applicant-form.component.css'],
  directives : [ROUTER_DIRECTIVES, ControlMessages]
})

export class ApplicantFormComponent {
  @Input() applicant:Applicant;
  @Output() onSubmit = new EventEmitter<Applicant>();

  submitted:boolean = false;
  experiences:ControlGroup[] = [new ControlGroup({
    company    : new Control('', Validators.required),
    designation: new Control('', Validators.required),
    from       : new Control('', Validators.required),
    to         : new Control('', Validators.required),
  })];
  experienceArray:ControlArray = new ControlArray(this.experiences);
  //experiences:ControlGroup = new ControlGroup({});

  formGroup:ControlGroup = new ControlGroup({
    name        : new Control('', Validators.compose([Validators.required, ValidationService.fullNameValidator])),
    email       : new Control('', Validators.compose([Validators.required, ValidationService.emailValidator])),
    address     : new Control('', Validators.required),
    phone_number: new Control('', Validators.compose([Validators.required, ValidationService.phoneNumberValidator])),

  });

  ngAfterViewInit() {
    $("#myTags").tagit({
      availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
      autocomplete : {delay: 0, minLength: 2}
    });
    $("#hobbyTags").tagit({
      availableTags: ["football", "music", "cricket", "reading"],
      autocomplete : {delay: 0, minLength: 2}
    });
  }

  ngAfterViewChecked() {
    var that = this;
    $(".portfolioTags").tagit({
      availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
      autocomplete : {delay: 0, minLength: 2}
    });
    $('.datepicker1').datepicker({format: 'yyyy/mm/dd', autoclose: true}).on('changeDate', function () {
      var index = $('.datepicker1').index(this);
      that.applicant.experiences[index].startDate = (<HTMLInputElement>$(this).children()[0]).value;
    });
    $('.datepicker2').datepicker({format: 'yyyy/mm/dd', autoclose: true}).on('changeDate', function () {
      var index = $('.datepicker2').index(this);
      that.applicant.experiences[index].endDate = (<HTMLInputElement>$(this).children()[0]).value;
    });

  }

  addObject(type, event) {
    event.preventDefault();
    switch (type) {
      case 'experience':
        //this.experiences.push(this.experienceCtrl);
        this.applicant.experiences.push(new Experience());
        break;
      case 'portfolio':
        this.applicant.portfolios.push(new Portfolio());
        break;
      case 'education':
        this.applicant.educations.push(new Education());
        break;
      case 'achievement':
        this.applicant.achievements.push(new Achievement());
        break;
      case 'reference':
        this.applicant.references.push(new Reference());
        break;
    }
  }

  deleteObject(type, index, event) {
    event.preventDefault();
    switch (type) {
      case 'experience':
        this.applicant.experiences.splice(index, 1);
        break;
      case 'portfolio':
        this.applicant.portfolios.splice(index, 1);
        break;
      case 'education':
        this.applicant.educations.splice(index, 1);
        break;
      case 'achievement':
        this.applicant.achievements.splice(index, 1);
        break;
      case 'reference':
        this.applicant.references.splice(index, 1);
        break;
    }
  }

  triggerPhotoUploadClickEvent(event) {
    event.preventDefault();
    $('.file-upload').click();
  }

  triggerResumeUploadClickEvent(event) {
    event.preventDefault();
    $('#resume-upload').click();
  }

  upload(event) {
    var reader = new FileReader();
    reader.onload = function (e:any) {
      $('#passport-photo')
      .attr('src', e.target.result)
      this.profilePic = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    //this.applicant.profile.profilePic = event.target.files[0];
  }

  uploadResume(event) {
    var reader = new FileReader();
    $('#resume-input').val(event.target.files[0].name);
  }

  submit(applicant:Applicant) {
    this.submitted = true;
    //console.log(this.experiences)
    if (this.formGroup.valid)
      console.log('valid')
    //this.onSubmit.emit(applicant);
    else
      toastr.error('Please fill the required fields', 'Error!');

    this.applicant.skills = $("#myTags").tagit("assignedTags");
    this.applicant.hobbies = $('#hobbyTags').tagit('assignedTags');
    this.applicant.portfolios.forEach(function (entry, index) {
      entry.technologies = $('#portfolioTags' + index).tagit("assignedTags");
    });
    console.log(applicant);
    //this.onSubmit.emit(applicant);
  }
}
