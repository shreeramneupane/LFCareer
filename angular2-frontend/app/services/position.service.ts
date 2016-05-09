import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Position} from '../models/position';
import {ENVR} from '../../env.config';

@Injectable()
export class PositionService {
    constructor(private http:Http) {
    }

    private _positionsURL:string =  ENVR.get('endPoint') + 'api/jobs';

    getPositions() {
        return this.http.get(this._positionsURL)
            .map(res => <Position[]> res.json())
            .catch(this._handleError);
    }

    private _handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
