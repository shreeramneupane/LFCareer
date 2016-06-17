import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';

import { ApiService }   from '../../shared/utils/api.util';
import { AppConstants } from '../../shared/constants/app.constants';
import { Converter }    from '../../shared/utils/converter.util';
import { Stage }        from './stage';

@Injectable()
export class StageService {
  constructor(private apiService:ApiService, private converter:Converter) {
  }
  
  listStage(page, sortBy) {
    let pathParams = AppConstants.STAGES + this.converter.serialize({
      sort  : sortBy,
      start : (page - 1) * 10,
      offset: AppConstants.OFFSET
    });
    return this.apiService.fetch(pathParams);
  }
  
  getStage(id:string):Observable<Stage> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.STAGES, id])).map(res=>res.stage)
  }
  
  createStage(stage:Stage):Observable<Stage> {
    return this.apiService.create(AppConstants.STAGES, stage);
  }
  
  updateStage(stage:Stage):Observable<Stage> {
    return this.apiService.update(this.converter.getPathParam([AppConstants.STAGES, stage.id]), stage);
  }
}
