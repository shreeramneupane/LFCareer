import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';

import { ApiService }   from '../../shared/utils/api.util';
import { AppConstants } from '../../shared/constants/app.constants';
import { Converter }    from '../../shared/utils/converter.util'
import { Job }          from './job';

@Injectable()
export class JobService {
  constructor(private apiService:ApiService, private converter:Converter) {
  }

  sortByPrecedence(stages) {
    stages.sort(function (a, b) {
      return a.precedence_number - b.precedence_number;
    })
  }

  listJobs(page, sortBy) {
    let pathParams = AppConstants.JOBS + this.converter.serialize({
      sort  : sortBy,
      start : (page - 1) * 10,
      offset: AppConstants.OFFSET
    });
    return this.apiService.fetch(pathParams);
  }

  getAllJobs(){
    return this.apiService.fetch(AppConstants.JOBS);
  }

  getJob(id:string) {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.JOBS, id])).map(res => res.job)
  }

  createJob(job:Job) {
    return this.apiService.create(AppConstants.JOBS, job);
  }

  updateJob(job:Job) {
    return this.apiService.update(this.converter.getPathParam([AppConstants.JOBS, job.id]), job);
  }
}
