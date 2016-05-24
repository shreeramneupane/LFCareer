import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';

import { Job } from './job';

@Injectable()
export class JobService {
  constructor(private http:Http) {
  }

  private jobsURL:string = 'http://localhost:5000/api/jobs/';

  listJobs() {
    return this.http.get(this.jobsURL)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getJob(id:string):Observable<Job> {
    return this.http.get(this.jobsURL + id)
    .map(res => res.json())
    .catch(this.handleError);
  }

  createJob(job:Job):Observable<Job> {
    let body = JSON.stringify(job);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.jobsURL, body, options)
    .map(res => <Job> res.json())
    .catch(this.handleError)
  }

   updateJob(job:Job) : Observable<Job>  {
   let body = JSON.stringify(job);
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });

   return this.http.put(this.jobsURL + job.id, body, options)
   .map(res =>  <Job> res.json())
   .catch(this.handleError)
   }
  private handleError(response:any) {
    return Observable.throw(JSON.parse(response['_body']).error.message || 'Server Error');
  }
}
