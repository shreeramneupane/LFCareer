import { Injectable }  from '@angular/core';
import * as nprogress from 'nprogress';

@Injectable()
export class LoaderService {
  requestCount:number = 0;

  constructor() {
    nprogress.configure({showSpinner: false});
  }

  apiRequest() {
    this.requestCount++;
    nprogress.start();
  }

  apiResponse() {
    this.requestCount--;
    if (this.requestCount == 0) {
      nprogress.done();
    }
  }
}