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

  getSkills(query:string):Observable<any> {
    return this.apiService.fetchAutCompleteValue(this.converter.getPathParam([AppConstants.SKILLS, 'search']) + this.converter.serialize({q: query}));
  }

  getApplicant(id:string):Observable<Applicant> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.APPLICANTS, id]))
    .map(response=> response.applicant)
  }

  getDocument(id:string, type:string) {
    var pathParam = this.converter.getPathParam([AppConstants.APPLICANTS, id, 'documents']) + this.converter.serialize({type: type});
    return this.apiService.fetch(pathParam);
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

}
