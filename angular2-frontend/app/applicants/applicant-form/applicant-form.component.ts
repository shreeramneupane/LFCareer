import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm }                                         from '@angular/common';
import { ROUTER_DIRECTIVES }                              from '@angular/router-deprecated';

import { Applicant }  from '../shared/applicant';
import { Education }  from '../shared/education';
import { Experience } from '../shared/experience';
import { Job }        from '../../jobs/shared/job';
import { JobService } from '../../jobs/shared/job.service';
import { Portfolio }  from '../shared/portfolio';
import { Profile }    from '../shared/profile';
import { Reference }  from '../shared/reference';
import { Training }   from '../shared/training';
@Component({
  selector   : 'applicant-form',
  templateUrl: 'app/applicants/applicant-form/applicant-form.component.html',
  styleUrls  : ['app/applicants/applicant-form/applicant-form.component.css'],
  providers  : [NgForm, JobService],
  directives : [ROUTER_DIRECTIVES]
})

export class ApplicantFormComponent implements OnInit {
  @Input() applicant:Applicant;
  @Output() onSubmit = new EventEmitter<Applicant>();

  jobs:Array<Job> = [];
  profile:Profile = new Profile();
  profilePic:any;
  experiences:Array<Experience> = [new Experience()];
  portfolios:Array<Portfolio> = [new Portfolio()];
  educations:Array<Education> = [new Education()];
  trainings:Array<Training> = [new Training()];
  references:Array<Reference> = [new Reference()];

  constructor(private jobService:JobService) {
  }

  ngOnInit() {
    this.getJobs();
  }

  ngAfterViewInit() {
    var that = this;
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

  getJobs() {
    this.jobService.listJobs()
    .subscribe(
    jobs => {
      this.jobs = jobs;
      this.applicant.job_id = jobs[0].id;
    },
    error => toastr.error(error)
    );
  }

  addObject(type, event) {
    event.preventDefault();
    switch (type) {
      case 'experience':
        this.applicant.experiences.push(new Experience());
        break;
      case 'portfolio':
        this.applicant.portfolios.push(new Portfolio());
        break;
      case 'education':
        this.applicant.educations.push(new Education());
        break;
      case 'training':
        this.applicant.trainings.push(new Training());
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
      case 'training':
        this.applicant.trainings.splice(index, 1);
        break;
      case 'reference':
        this.applicant.references.splice(index, 1);
        break;
    }
  }

  uploadProfilePhoto(event) {
    event.preventDefault();
    $('.file-upload').click();
  }

  upload(event) {
    var reader = new FileReader();
    reader.onload = function (e:any) {
      $('#passport-photo')
      .attr('src', e.target.result)
      this.profilePic = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.applicant.profile.profilePic = event.target.files[0];
  }

  submit(applicant:Applicant) {
    this.applicant.skills = $("#myTags").tagit("assignedTags");
    this.applicant.hobbies = $('#hobbyTags').tagit('assignedTags');
    this.applicant.portfolios.forEach(function (entry, index) {
      entry.technologies = $('#portfolioTags' + index).tagit("assignedTags");
    });
    console.log(applicant);
    //this.onSubmit.emit(applicant);
  }
}
