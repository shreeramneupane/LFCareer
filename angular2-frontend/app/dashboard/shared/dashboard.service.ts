import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService }   from '../../shared/utils/api.util';
import { AppConstants } from '../../shared/constants/app.constants';
import { Converter }    from '../../shared/utils/converter.util';
import {OpenJob} from './open-job';

@Injectable()
export class DashboardService {
  constructor(private apiService:ApiService, private converter:Converter) {
  }

  getOpenJobs() {
    let fakeJobs:Array<OpenJob> = [
      {
        title        : 'Senior software Engineer',
        newApplicants: 2,
        inProgress   : 2,
        rejected     : 2,
        hired        : 2
      },
      {
        title        : 'Communication Manager',
        newApplicants: 0,
        inProgress   : 2,
        rejected     : 2,
        hired        : 2
      },
      {
        title        : 'Project Manager',
        newApplicants: 2,
        inProgress   : 2,
        rejected     : 2,
        hired        : 2
      },
      {
        title        : 'Designer',
        newApplicants: 2,
        inProgress   : 2,
        rejected     : 2,
        hired        : 2
      }
    ];
    return fakeJobs;
  }

  getNewApplicants(){
    return [
      {name:'BIshal', post:'manager', experience:'0', phone:'999', linkedin:'asdf', resume: 'df', appliedDate:'2017/05/09'},
      {name:'BIshal', post:'engineer', experience:'0', phone:'999', linkedin:'asdf', resume: 'df', appliedDate:'2017/05/09'}
    ]
  }
}
