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

  listJobs() {
    return this.apiService.fetch(AppConstants.JOBS);
  }

  getJob(id:string) {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.JOBS, id]));
  }

  createJob(job:Job) {
    return this.apiService.create(AppConstants.JOBS, job);
  }

  updateJob(job:Job) {
    return this.apiService.update(this.converter.getPathParam([AppConstants.JOBS, job.id]), job);
  }
}
