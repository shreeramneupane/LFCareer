import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';

import { ApiService }   from '../../shared/utils/api.util';
import { AppConstants } from '../../shared/constants/app.constants';
import { Converter }    from '../../shared/utils/converter.util';
import { Position }     from './position';

@Injectable()
export class PositionService {
  constructor(private apiService:ApiService, private converter:Converter) {
  }

  newPosition() {
    return new Position('', '', '');
  }

  listPosition() {
    return this.apiService.fetch(AppConstants.POSITIONS);
  }

  getPosition(id:string):Observable<any> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.POSITIONS, id]));
  }

  createPosition(position:Position):Observable<Position> {
    return this.apiService.create(AppConstants.POSITIONS, position);
  }

  updatePosition(position:Position):Observable<Position> {
    return this.apiService.update(this.converter.getPathParam([AppConstants.POSITIONS, position.id]), position);
  }
}
