import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';

var config = require('config');

@Injectable()
export class CoreService {
  URL:string = window.location.origin + '/api/core/';
  constructor(private http:Http) {
  }

  fetch(pathParams):Observable<any> {
    var that = this;
    return this.http.get(this.URL + pathParams, this.getHeader())
    .map(res => {console.log(res)})
    .catch(res => {
      return this.handleError(res, function () {
        return that.fetch(pathParams)
      })
    })
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

  private handleError(response:any, func:any) {
    if (response.status == 401) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept'      : 'application/json'
      });
      let options = new RequestOptions({headers: headers});
      let body = JSON.stringify({'refresh_token': localStorage.getItem('refresh_token')});
      return this.http.post(window.location.origin + '/api/auth/auth/refreshtoken', body, options)
      .flatMap(res => {
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
