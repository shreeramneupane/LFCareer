import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';
import { LoaderService } from '../services/loader.service';
var config = require('config');

@Injectable()
export class ApiService {
  private URL:string = config.API_URL;

  constructor(private http:Http, private loaderService:LoaderService) {
  }

  uploadFile(pathParams, documents):Observable<any> {
    this.loaderService.apiRequest();

    let source = Observable.create(observer => {
      let formData:FormData = new FormData(),
      xhr:XMLHttpRequest = new XMLHttpRequest();

      for (var key in documents) {
        formData.append(key, documents[key], documents[key].name);
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

      xhr.upload.onprogress = (event) => {
        //this.progress = Math.round(event.loaded / event.total * 100);

        //this.progressObserver.next(this.progress);
      };
      xhr.open('POST', this.URL + pathParams, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      xhr.send(formData);
    });
    source.subscribe(this.loaderService.apiResponse());
    return source;
  }

  fetchAutCompleteValue(pathParams:string):Observable<any> {
    var that = this;
    return this.http.get(this.URL + pathParams, this.getHeader())
    .map(res => res.json())
    .catch(res => {
      return this.handleError(res, function () {
        return that.fetchAutCompleteValue(pathParams)
      })
    })
  }

  fetch(pathParams):Observable<any> {
    var that = this;
    this.loaderService.apiRequest();
    let source = this.http.get(this.URL + pathParams, this.getHeader())
    .map(res => res.json())
    .catch(res => {
      return this.handleError(res, function () {
        return that.fetch(pathParams)
      })
    })

    source.subscribe(response => this.loaderService.apiResponse(), error => this.loaderService.apiResponse());
    return source;
  }

  create(pathParams:string, object:any):Observable<any> {
    var that = this;
    let body = JSON.stringify(object);
    this.loaderService.apiRequest();

    let source = this.http.post(this.URL + pathParams, body, this.getHeader())
    .map(res => res.json())
    .catch(res => {
      return this.handleError(res, function () {
        return that.create(pathParams, object)
      })
    })
    source.subscribe(response => this.loaderService.apiResponse(), error => this.loaderService.apiResponse());
    return source;
  }

  update(pathParams:string, object:any):Observable < any > {
    var that = this;
    let body = JSON.stringify(object);

    this.loaderService.apiRequest();
    let source = this.http.put(this.URL + pathParams, body, this.getHeader())
    .map(res => res.json())
    .catch(res => {
      return this.handleError(res, function () {
        return that.update(pathParams, object)
      })
    })
    source.subscribe(response => this.loaderService.apiResponse(), error => this.loaderService.apiResponse());
    return source;
  }

  private getHeader():any {
    let headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    let options = new RequestOptions({headers: headers});
    return options;
  }

  private errorMessage(response) {
    return Observable.throw(response.json().error.message);
  }

  private handleError(response:any, func:any):any {
    if (response.status == 401) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept'      : 'application/json'
      });
      let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({'refresh_token': localStorage.getItem('refresh_token')});
      return this.http.post(window.location.origin + '/api/auth/auth/refreshtoken', body, options)
      .flatMap((res:any) => {
        res = res.json();
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        return func();
      })
    } else {
      return this.errorMessage(response);
    }
  }
}