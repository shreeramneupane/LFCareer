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

import { ApplicantService } from '../shared/applicant.service';
import { ValidationService } from '../../shared/utils/validation.util';

import * as toastr from 'toastr';

@Component({
  selector  : 'applicant-form',
  template  : require('./applicant-form.component.html'),
  styles    : [require('./applicant-form.component.css')],
  directives: [ROUTER_DIRECTIVES, ControlMessages]
})

export class ApplicantFormComponent {
  @Input() applicant:Applicant;
  @Output() onSubmit = new EventEmitter();

  submitted:boolean = false;
  agreement:boolean = false;

  documents:any = {};

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
    coverLetter           : new Control('', Validators.compose([Validators.required, ValidationService.characterMaxCountValidator.bind(null, 500), ValidationService.characterMinCountValidator.bind(null, 50)])),
    sourceDescriptionName : new Control(''),
    sourceDescriptionOther: new Control('')
  });

  constructor(private applicantService:ApplicantService) {
  }

  ngAfterViewInit() {
    var that = this;
    $("#myTags").tagit({
      autocomplete: {
        delay: 0, minLength: 1, source: function (request, response) {
          that.getAutoCompleteValue(request, response);
        }
      }
    });
  }

  ngAfterViewChecked() {
    var that = this;
    $(".portfolioTags").tagit({
      autocomplete: {
        delay: 0, minLength: 1, source: function (request, response) {
          that.getAutoCompleteValue(request, response);
        }
      }
    });
    $('.datepicker1').datepicker({format: 'yyyy/mm/dd', autoclose: true}).on('changeDate', function (e) {
      var index = $('.datepicker1').index(this);
      $("#datepicker2" + index).datepicker('setStartDate', e.date);
      that.applicant.experiences[index].from_date = (<HTMLInputElement>$(this).children()[0]).value;
    });
    $('.datepicker2').datepicker({format: 'yyyy/mm/dd', autoclose: true}).on('changeDate', function (e) {
      var index = $('.datepicker2').index(this);
      $("#datepicker1" + index).datepicker('setEndDate', e.date);
      that.applicant.experiences[index].to_date = (<HTMLInputElement>$(this).children()[0]).value;
    });
  }

  getAutoCompleteValue(request, response) {
    console.log(request)
    this.applicantService.getSkills(request.term).subscribe(
    skills=> {
      response(skills)
    },
    error=>toastr.error(error)
    );
    //this.applicantService.response(['java', 'javascript', 'jquery']);
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

  uploadPhoto(event) {
    var reader = new FileReader();
    reader.onload = function (e:any) {
      $('.passport-photo')
      .css('content', 'url(' + e.target.result + ')');
    }

    if (ValidationService.fileValidator('image', event.target.files[0].name)) {
      reader.readAsDataURL(event.target.files[0]);
      this.documents.profile_picture = event.target.files[0];
    } else {
      toastr.error('Please select your passport size photo', 'Error!');
    }
  }

  uploadResume(event) {
    if (ValidationService.fileValidator('document', event.target.files[0].name)) {
      $('#resume-input').val(event.target.files[0].name);
      this.documents.resume = event.target.files[0];
    } else {
      toastr.error('Please select your resume', 'Error!');
    }
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
      entry.workareas = $('#portfolioTags' + index).tagit("assignedTags");
    });
    let formDatas = jQuery.extend(true, {}, applicant);
    formDatas.experiences = this.removeEmptyObjectsFromArray(formDatas.experiences);
    formDatas.references = this.removeEmptyObjectsFromArray(formDatas.references);
    formDatas.achievements = this.removeEmptyObjectsFromArray(formDatas.achievements);
    return formDatas;
  }

  removeEmptyObjectsFromArray(array:any) {
    return array.filter(function (object) {
      /*return (keyName in object) && object[keyName] != '';*/
      for (var i in object) {
        if (object[i] != null && object[i] != '') {
          return object;
        }
      }
    }
    );
  }

  submit(applicant:Applicant) {
    this.onSubmit.emit({applicant: 'asdf', documents: this.documents});
    console.log(applicant);
    this.submitted = true;
    let formDatas:Applicant = this.getFormDatas(applicant);

    if (!this.formGroup.valid)
      toastr.error('Please fill the required fields', 'Error!');
    else if (!this.documents.resume || !this.documents.profile_picture)
      toastr.error('Please upload all required documents');
    else if (!this.agreement) {
      toastr.error('Agree on terms and conditions before submiting form');
    }
    else {
      console.log('valid')
      console.log(this.documents);
      this.onSubmit.emit({applicant: formDatas, documents: this.documents});
    }
  }
}
