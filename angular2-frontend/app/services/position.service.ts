import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Position} from '../models/position';

@Injectable()
export class PositionService {
  constructor(private http:Http) {
  }

  private _positionsURL:string = 'http://localhost:5000/api/positions';

  getPositions() {
    return this.http.get(this._positionsURL)
    .map(res => <Position[]> res.json())
    .catch(this._handleError);
  }

  newPosition() {
    return new Position('', '', '');
  }

  createPosition(position:Position):Observable<Position> {
    let body    = JSON.stringify(position);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this._positionsURL, body, options)
    .map(res => <Position> res.json())
    .catch(this._handleError)
  }

  private _handleError(response:any) {
    return Observable.throw(JSON.parse(response['_body']).error.message || 'Server Error');
  }
}
