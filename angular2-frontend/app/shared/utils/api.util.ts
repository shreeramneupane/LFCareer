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

  uploadFile(pathParams, documents):Observable<any> {
    return Observable.create(observer => {
      let formData:FormData = new FormData(),
      xhr:XMLHttpRequest = new XMLHttpRequest();

      for (var key in documents) {
        formData.append("key", files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', this.URL + pathParams, true);
      xhr.send(formData);
    });
  }

  fetch(pathParams):Observable < any > {
    return this.http.get(this.URL + pathParams)
    .map(res => res.json())
    .catch(this.handleError);
  }

  create(pathParams:string, object:any):Observable < any > {
    let body = JSON.stringify(object);

    return this.http.post(this.URL + pathParams, body, this.options)
    .map(res => res.json())
    .catch(this.handleError)
  }

  update(pathParams:string, object:any):Observable < any > {
    let body = JSON.stringify(object);

    return this.http.put(this.URL + pathParams, body, this.options)
    .map(res => res.json())
    .catch(this.handleError)
  }

  private
  handleError(response:any) {
    return Observable.throw(JSON.parse(response['_body']).error.message || 'Server Error');
  }
}