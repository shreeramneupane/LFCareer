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

  getAllPositions(){
    return this.apiService.fetch(AppConstants.POSITIONS);
  }

  listPosition(page, sortBy) {
    let pathParams = AppConstants.POSITIONS + this.converter.serialize({
      sort  : sortBy,
      start : (page - 1) * 10,
      offset: AppConstants.OFFSET
    });
    return this.apiService.fetch(pathParams);
  }

  getPosition(id:string):Observable<Position> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.POSITIONS, id]));
  }

  createPosition(position:Position):Observable<Position> {
    return this.apiService.create(AppConstants.POSITIONS, position);
  }

  updatePosition(position:Position):Observable<Position> {
    return this.apiService.update(this.converter.getPathParam([AppConstants.POSITIONS, position.id]), position);
  }
}
