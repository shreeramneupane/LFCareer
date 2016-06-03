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
  agreement:boolean = false;

  portfolioTitleArray:ControlArray = new ControlArray([new Control('', Validators.required)]);
  portfolioDescriptionArray:ControlArray = new ControlArray([new Control('', Validators.required)]);

  educationDegreeArray:ControlArray = new ControlArray([new Control('', Validators.required)]);
  educationUniversityArray:ControlArray = new ControlArray([new Control('', Validators.required)]);
  educationCollegeArray:ControlArray = new ControlArray([new Control('', Validators.required)]);
  educationGradeArray:ControlArray = new ControlArray([new Control('', Validators.required)]);
  educationPassedYearArray:ControlArray = new ControlArray([new Control('', Validators.compose([Validators.required, ValidationService.yearValidator]))]);

  achievementPassedYearArray:ControlArray = new ControlArray([new Control('', ValidationService.yearValidator)]);

  referenceFullNameArray:ControlArray = new ControlArray([new Control('', ValidationService.fullNameValidator)]);
  referenceEmailArray:ControlArray = new ControlArray([new Control('', ValidationService.emailValidator)]);
  referencePhoneArray:ControlArray = new ControlArray([new Control('', ValidationService.phoneNumberValidator)]);

  formGroup:ControlGroup = new ControlGroup({
    name                  : new Control('', Validators.compose([Validators.required, ValidationService.fullNameValidator])),
    email                 : new Control('', Validators.compose([Validators.required, ValidationService.emailValidator])),
    address               : new Control('', Validators.required),
    phone_number          : new Control('', Validators.compose([Validators.required, ValidationService.phoneNumberValidator])),
    portfolioTitle        : this.portfolioTitleArray,
    portfolioDescription  : this.portfolioDescriptionArray,
    educationDegree       : this.educationDegreeArray,
    educationUniversity   : this.educationUniversityArray,
    educationCollege      : this.educationCollegeArray,
    educationGrade        : this.educationGradeArray,
    educationPassedYear   : this.educationPassedYearArray,
    achievementPassedYear : this.achievementPassedYearArray,
    referenceFullName     : this.referenceFullNameArray,
    referenceEmail        : this.referenceEmailArray,
    referencePhone        : this.referencePhoneArray,
    coverLetter           : new Control('', Validators.compose([Validators.required, ValidationService.characterCountValidator.bind(null, 250)])),
    sourceDescriptionName : new Control(''),
    sourceDescriptionOther: new Control('')
  });

  ngAfterViewInit() {
    $("#myTags").tagit({
      availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
      autocomplete : {delay: 0, minLength: 2}
    });
  }

  ngAfterViewChecked() {
    var that = this;
    $(".portfolioTags").tagit({
      availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
      autocomplete : {delay: 0, minLength: 2}
    });
    $('.datepicker1').datepicker({format: 'yyyy/mm/dd', autoclose: true}).on('changeDate', function (e) {
      var index = $('.datepicker1').index(this);
      $("#datepicker2" + index).datepicker('setStartDate', e.date);
      that.applicant.experiences[index].startDate = (<HTMLInputElement>$(this).children()[0]).value;
    });
    $('.datepicker2').datepicker({format: 'yyyy/mm/dd', autoclose: true}).on('changeDate', function (e) {
      var index = $('.datepicker2').index(this);
      $("#datepicker1" + index).datepicker('setEndDate', e.date);
      that.applicant.experiences[index].endDate = (<HTMLInputElement>$(this).children()[0]).value;
    });
  }

  addObject(type, event) {
    event.preventDefault();
    switch (type) {
      case 'experience':
        this.applicant.experiences.push(new Experience());
        break;
      case 'portfolio':
        this.portfolioTitleArray.push(new Control('', Validators.required));
        this.portfolioDescriptionArray.push(new Control('', Validators.required));
        this.applicant.portfolios.push(new Portfolio());
        break;
      case 'education':
        this.educationCollegeArray.push(new Control('', Validators.required));
        this.educationDegreeArray.push(new Control('', Validators.required));
        this.educationGradeArray.push(new Control('', Validators.required));
        this.educationPassedYearArray.push(new Control('', Validators.compose([Validators.required, ValidationService.yearValidator])));
        this.educationUniversityArray.push(new Control('', Validators.required));
        this.applicant.educations.push(new Education());
        break;
      case 'achievement':
        this.achievementPassedYearArray.push(new Control('', ValidationService.yearValidator));
        this.applicant.achievements.push(new Achievement());
        break;
      case 'reference':
        this.referenceEmailArray.push(new Control('', ValidationService.emailValidator));
        this.referenceFullNameArray.push(new Control('', ValidationService.fullNameValidator));
        this.referencePhoneArray.push(new Control('', ValidationService.phoneNumberValidator));
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
        this.portfolioTitleArray.removeAt(index);
        this.portfolioDescriptionArray.removeAt(index);
        this.applicant.portfolios.splice(index, 1);
        break;
      case 'education':
        this.educationCollegeArray.removeAt(index);
        this.educationDegreeArray.removeAt(index);
        this.educationGradeArray.removeAt(index);
        this.educationPassedYearArray.removeAt(index);
        this.educationUniversityArray.removeAt(index);
        this.applicant.educations.splice(index, 1);
        break;
      case 'achievement':
        this.achievementPassedYearArray.removeAt(index);
        this.applicant.achievements.splice(index, 1);
        break;
      case 'reference':
        this.referenceEmailArray.removeAt(index);
        this.referenceFullNameArray.removeAt(index);
        this.referencePhoneArray.removeAt(index);
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

  removeSourceDescription() {
    this.applicant.source_description = (<HTMLInputElement>event.target).value == 'social' ? 'facebook' : null;

    switch ((<HTMLInputElement>event.target).value) {
      case 'friend':
        this.formGroup.addControl('sourceDescriptionOther', new Control(''));
        this.formGroup.addControl('sourceDescriptionName', new Control('', Validators.compose([Validators.required, ValidationService.fullNameValidator])))
        break;
      case 'other':
        this.formGroup.addControl('sourceDescriptionName', new Control(''));
        this.formGroup.addControl('sourceDescriptionOther', new Control('', Validators.required))
        break;
      default:
        this.formGroup.addControl('sourceDescriptionName', new Control(''));
        this.formGroup.addControl('sourceDescriptionOther', new Control(''));
    }

  }

  getFormDatas(applicant:Applicant):Applicant {
    this.applicant.skills = $("#myTags").tagit("assignedTags");
    this.applicant.portfolios.forEach(function (entry, index) {
      entry.technologies = $('#portfolioTags' + index).tagit("assignedTags");
    });
    let formDatas = jQuery.extend(true, {}, applicant);
    this.removeEmptyObjectsFromArray('experiences', formDatas);
    this.removeEmptyObjectsFromArray('references', formDatas);
    return formDatas;
  }

  removeEmptyObjectsFromArray(arrayName:string, formDatas:Applicant) {
    let newArray = formDatas[arrayName];
    for (var i = 0; i < newArray.length; i++) {
      let allEmpty:boolean = true;
      let object = newArray[i]
      for (let key in object) {
        if (object[key] != null && object[key] != '') {
          allEmpty = false;
          break;
        }
      }
      if (allEmpty) {
        newArray.splice(i--, 1);
      }
    }
  }

  submit(applicant:Applicant) {
    this.submitted = true;
    let formDatas:Applicant = this.getFormDatas(applicant);

    if (!this.formGroup.valid)
      toastr.error('Please fill the required fields', 'Error!');
    /*else if(not upload pic)
     toastr.error('Please upload all required documents');*/
    else if (!this.agreement) {
      toastr.error('Agree on terms and conditions before submiting form');
    }
    else {
      console.log('valid')
      console.log(formDatas);
      //this.onSubmit.emit(applicant);
    }
  }
}
