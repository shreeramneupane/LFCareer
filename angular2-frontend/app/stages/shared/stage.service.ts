import { Injectable }                     from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable }                     from 'rxjs/Rx';

import { Stage } from './stage';

@Injectable()
export class StageService {
  constructor(private http:Http) {
  }

  private stagesURL:string = 'http://localhost:5000/api/stages/';

  listStage() {
    return this.http.get(this.stagesURL)
    .map(res => <Stage[]> res.json())
    .catch(this.handleError);
  }

  getStage(id:string): Observable<Stage>  {
    return this.http.get(this.stagesURL + id)
    .map(res => res.json())
    .catch(this.handleError);
  }

  newStage() {
    return new Stage('');
  }

  createStage(stage:Stage):Observable<Stage> {
    let body    = JSON.stringify(stage);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.stagesURL, body, options)
    .map(res => <Stage> res.json())
    .catch(this.handleError)
  }

  updateStage(stage:Stage):Observable<Stage>  {
    let body = JSON.stringify(stage);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.stagesURL + stage.id, body, options)
    .map(res =>  <Stage> res.json())
    .catch(this.handleError)
  }

  private handleError(response:any) {
    return Observable.throw(JSON.parse(response['_body']).error.message || 'Server Error');
  }
}
