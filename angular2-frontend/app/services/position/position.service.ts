import { Injectable } from 'angular2/core';
import {Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Position } from '../../models/position';

@Injectable()
export class PositionService {
    constructor(private http: Http) { }

    private _positionsURL: string = 'http://localhost:5000/api/positions';

    getPositions () {
        return this.http.get(this._positionsURL)
            .map(res => <Position[]> res.json())
            .catch(this._handleError);
    }

    private _handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
