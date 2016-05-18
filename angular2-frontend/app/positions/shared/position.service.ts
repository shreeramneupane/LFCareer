import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';

import {Position} from './position';

@Injectable()
export class PositionService {
  constructor(private http:Http) {
  }

  private positionsURL:string = 'http://localhost:5000/api/positions';

  listPosition() {
    return this.http.get(this.positionsURL)
    .map(res => <Position[]> res.json())
    .catch(this.handleError);
  }

  newPosition() {
    return new Position('', '', '');
  }

  createPosition(position:Position):Observable<Position> {
    let body    = JSON.stringify(position);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.positionsURL, body, options)
    .map(res => <Position> res.json())
    .catch(this.handleError)
  }

  private handleError(response:any) {
    return Observable.throw(JSON.parse(response['_body']).error.message || 'Server Error');
  }
}
