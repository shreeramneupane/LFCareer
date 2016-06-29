import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService }   from '../../shared/utils/api.util';
import { CoreService } from '../../shared/services/core.service';
import { AppConstants } from '../../shared/constants/app.constants';
import { Converter }    from '../../shared/utils/converter.util';
import { Applicant }    from './applicant';

@Injectable()
export class ApplicantService {
  constructor(private apiService:ApiService, private coreService:CoreService, private converter:Converter) {
  }
  
  listApplicants(page, sortBy) {
    let pathParams = AppConstants.APPLICANTS + this.converter.serialize({
      sort  : sortBy,
      start : (page - 1) * 10,
      offset: AppConstants.OFFSET
    });
    return this.apiService.fetch(pathParams);
  }

  getStages(id:string) {
    var pathParams = this.converter.getPathParam([AppConstants.APPLICANTS, id, AppConstants.STAGES]);
    var queryParam = this.converter.serialize({sort: 'precedence_number'});
    return this.apiService.fetch(pathParams + queryParam)
    .map(response=> response.stages)
  }
  
  getApplicant(id:string):Observable<Applicant> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.APPLICANTS, id]))
    .map(response=> response.applicant)
  }

  getTimeline(id:string):Observable<any> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.APPLICANTS, id, 'timeline']))
    .map(response=>response.applicant_stages)
  }

  startTimeline(timeline:any, id:string) {
    return this.apiService.update(this.converter.getPathParam([AppConstants.APPLICANTS, id]), timeline);
  }

  getDocument(id:string, type:string) {
    var pathParam = this.converter.getPathParam([AppConstants.APPLICANTS, id, 'documents']) + this.converter.serialize({type: type});
    return this.apiService.fetch(pathParam);
  }

  getSkills(query:string) {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.SKILLS, 'search']) + this.converter.serialize({q: query}));
  }

  uploadDocuments(documents:any, id:string) {
    return this.apiService.uploadFile(this.converter.getPathParam([AppConstants.APPLICANTS, id, 'documents']), documents);
  }
  
  createApplicant(applicant:Applicant) {
    return this.apiService.create(AppConstants.APPLICANTS, applicant);
  }
  
  updateApplicant(applicant:Applicant):Observable<Applicant> {
    return this.apiService.update(this.converter.getPathParam([AppConstants.APPLICANTS, applicant.id]), applicant);
  }

  filterTimeline(timeline:any, applicant:Applicant) {
    let timelineItems = [];
    if (timeline[timeline.length - 1].stage.is_interview && (timeline[timeline.length - 1].remark == '' || !timeline[timeline.length - 1].hasOwnProperty('remark'))) {
      timeline[timeline.length - 1]['has_button'] = true;
    }

    timeline.forEach(function (item) {
      let newItem = {title: ''};
      if (item.stage.title == 'Pending') {
        if (applicant.direct_apply && applicant.job) {
          newItem.title = 'Direct Apply (' + applicant.job.title + ')';
        } else if (applicant.direct_apply) {
          newItem.title = 'Direct Apply';
        } else {
          newItem.title = 'Applied for ' + applicant.job.title;
        }
      } else {
        newItem.title = item.stage.title;
      }
      var invalidKeys = ['applicant_id', 'stage_id', 'updated_at', 'stage'];

      for (var key in item) {
        if (!(invalidKeys.indexOf(key) > -1) && ((item[key] != null && item[key] !== ''))) {
          newItem[key] = item[key];
        }
      }
      timelineItems.push(newItem);
    });
    return timelineItems;
  }

  filterStages(stages:any, timeline:any) {
    let validStages = [];
    if (timeline.length && timeline[timeline.length - 1].stage.is_termination == true) {
      return validStages;
    }

    stages.forEach(stage => {
      if (stage.is_repeatable == true) {
        validStages.push(stage);
      } else {
        let isValidStage = true;
        for (var i = 0; i < timeline.length; i++) {
          if (timeline[i].stage.title == stage.title) {
            isValidStage = false;
            break;
          }
        }
        if (isValidStage == true) {
          validStages.push(stage);
        }
      }
    })
    return validStages;
  }

  getSelectedStageId(stages:any, timeline:any) {
    let latestTimelineId = timeline[timeline.length - 1].stage.id;
    if (!stages.length) {
      return 0;
    } else if (timeline[timeline.length - 1].stage.is_interview && (timeline[timeline.length - 1].remark == '' || !timeline[timeline.length - 1].hasOwnProperty('remark'))) {
      return 0;
    }
    for (var i = 0; i < stages.length; i++) {
      if (stages[i].id == latestTimelineId && i < stages.length - 1) {
        return stages[i + 1].id;
      } else if (stages[i].id == latestTimelineId) {
        return stages[stages.length - 1].id;
      }
    }
    return stages[0].id;
  }

  getAutoCompleteValue(term) {
    console.log(term)
    return this.coreService.fetch('employees' + this.converter.serialize({q: term}));
  }
}
