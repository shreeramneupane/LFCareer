import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService }   from '../../shared/utils/api.util';
import { AppConstants } from '../../shared/constants/app.constants';
import { Converter }    from '../../shared/utils/converter.util';
import { Applicant }    from './applicant';

@Injectable()
export class ApplicantService {
  constructor(private apiService:ApiService, private converter:Converter) {
  }
  
  listApplicants(page, sortBy) {
    let pathParams = AppConstants.APPLICANTS + this.converter.serialize({
      sort  : sortBy,
      start : (page - 1) * 10,
      offset: AppConstants.OFFSET
    });
    return this.apiService.fetch(pathParams);
  }

  getStages(id:string) {
    var pathParams = this.converter.getPathParam([AppConstants.APPLICANTS, id, AppConstants.STAGES]);
    var queryParam = this.converter.serialize({sort: 'precedence_number'});
    return this.apiService.fetch(pathParams + queryParam)
    .map(response=> response.stages)
  }
  
  getApplicant(id:string):Observable<Applicant> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.APPLICANTS, id]))
    .map(response=> response.applicant)
  }

  getTimeline(id:string):Observable<any> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.APPLICANTS, id, AppConstants.STAGES]))
    .map(response=>response.applicant_stages)
  }

  startTimeline(timeline:any, id:string) {
    console.log(timeline)
    return this.apiService.update(this.converter.getPathParam([AppConstants.APPLICANTS, id]), timeline);
  }

  getDocument(id:string, type:string) {
    var pathParam = this.converter.getPathParam([AppConstants.APPLICANTS, id, 'documents']) + this.converter.serialize({type: type});
    return this.apiService.fetch(pathParam);
  }

  getSkills(query:string) {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.SKILLS, 'search']) + this.converter.serialize({q: query}));
  }

  uploadDocuments(documents:any, id:string) {
    return this.apiService.uploadFile(this.converter.getPathParam([AppConstants.APPLICANTS, id, 'documents']), documents);
  }
  
  createApplicant(applicant:Applicant) {
    return this.apiService.create(AppConstants.APPLICANTS, applicant);
  }
  
  updateApplicant(applicant:Applicant):Observable<Applicant> {
    return this.apiService.update(this.converter.getPathParam([AppConstants.APPLICANTS, applicant.id]), applicant);
  }

  filterTimeline(timeline:any, applicant:Applicant) {
    let timelineItems = [];
    timeline.forEach(function (item) {
      let newItem = {};
      if (item.stage.title == 'Pending') {
        if (applicant.direct_apply && applicant.job) {
          newItem.title = 'Direct Apply (' + applicant.job.title + ')';
        } else if (applicant.direct_apply) {
          newItem.title = 'Direct Apply';
        } else {
          newItem.title = 'Applied for ' + applicant.job.title;
        }
        item.stage = null;
      } else {
        newItem.title = item.stage.title;
        item.stage = null;
      }
      var invalidKeys = ['id', 'applicant_id', 'stage_id', 'updated_at'];

      for (var key in item) {
        if (!(invalidKeys.indexOf(key) > -1) && ((item[key] != null && item[key] !== ''))) {
          newItem[key] = item[key];
        }
      }
      timelineItems.push(newItem);
    });
    return timelineItems;
  }
}
