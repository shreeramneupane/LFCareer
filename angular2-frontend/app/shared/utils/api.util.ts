import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';

var config = require('config');

@Injectable()
export class ApiService {
  private URL:string = config.API_URL;
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http:Http) {
  }

  uploadFile(pathParams, body):Observable<any> {
    let headers = new Headers({'enctype': 'multipart/form-data'});
    let options = new RequestOptions({headers: headers});
    console.log(body)
    return this.http.post(this.URL + pathParams, body, options)
    .map(res => res.json())
    .catch(this.handleError)
  }

  fetch(pathParams):Observable<any> {
    return this.http.get(this.URL + pathParams)
    .map(res => res.json())
    .catch(this.handleError);
  }

  create(pathParams:string, object:any):Observable<any> {
    let body = JSON.stringify(object);

    return this.http.post(this.URL + pathParams, body, this.options)
    .map(res => res.json())
    .catch(this.handleError)
  }

  update(pathParams:string, object:any):Observable<any> {
    let body = JSON.stringify(object);

    return this.http.put(this.URL + pathParams, body, this.options)
    .map(res => res.json())
    .catch(this.handleError)
  }

  private handleError(response:any) {
    return Observable.throw(JSON.parse(response['_body']).error.message || 'Server Error');
  }
}