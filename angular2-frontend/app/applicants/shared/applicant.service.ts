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
  
  listApplicants() {
    return this.apiService.fetch(AppConstants.APPLICANTS);
  }
  
  getApplicant(id:string):Observable<Applicant> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.APPLICANTS, id]));
  }
  
  createApplicant(applicant:Applicant):Observable<Applicant> {
    return this.apiService.create(AppConstants.APPLICANTS, applicant);
  }
  
  updateApplicant(applicant:Applicant):Observable<Applicant> {
    return this.apiService.update(this.converter.getPathParam([AppConstants.APPLICANTS, applicant.id]), applicant);
  }
}
