import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService }   from '../../../shared/utils/api.util';
import { CoreService } from '../../../shared/services/core.service';
import { AppConstants } from '../../../shared/constants/app.constants';
import { Converter }    from '../../../shared/utils/converter.util';

@Injectable()
export class TimelineService {
  constructor(private apiService:ApiService, private coreService:CoreService, private converter:Converter) {
  }

  getStages(id:string) {
    var pathParams = this.converter.getPathParam([AppConstants.APPLICANTS, id, AppConstants.STAGES]);
    var queryParam = this.converter.serialize({sort: 'precedence_number'});
    return this.apiService.fetch(pathParams + queryParam)
    .map(response=> response.stages)
  }

  getTimeline(id:string):Observable<any> {
    return this.apiService.fetch(this.converter.getPathParam([AppConstants.APPLICANTS, id, 'timeline']))
    .map(response=>response.applicant_stages)
  }

  filterTimeline(timeline:any, applicant:any) {
    let timelineItems = [];
    if (timeline[timeline.length - 1].stage.is_interview && (timeline[timeline.length - 1].remark == null)) {
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
      var invalidKeys = ['applicant_id', 'stage_id', 'created_at', 'stage'];

      for (var key in item) {
        if (!(invalidKeys.indexOf(key) > -1) && ((item[key] != null && item[key] !== ''))) {
          newItem[key] = item[key];
        }
      }
      timelineItems.push(newItem);
      if (item.stage.is_interview && item.remark) {
        timelineItems[timelineItems.length - 1].remark = null;
        timelineItems.push({
          title     : item.stage.title + ' Completed',
          remark    : item.remark,
          updated_at: item.remark.updated_at
        });
      }
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
    } else if (timeline[timeline.length - 1].stage.is_interview && (timeline[timeline.length - 1].remark == null)) {
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
    return this.coreService.fetch('employees' + this.converter.serialize({q: term, hrStatus: 'Permanent'}));
  }

  startTimeline(timeline:any, id:string) {
    return this.apiService.update(this.converter.getPathParam([AppConstants.APPLICANTS, id]), timeline);
  }

  checkTime(time1, time2) {
    return (this.getTotalMinutes(time1) - this.getTotalMinutesFromString(time2));
  }

  getTotalMinutes(current) {
    let hours = current.time.hours == 12 ? 0 : current.time.hours;
    let minutes = current.time.minutes;
    let meridian = current.time.meridian == 'PM' ? 12 : 0;
    return minutes + (hours + meridian) * 60;
  }

  getTotalMinutesFromString(time) {
    let timeInArray = time.split(' ');
    let meridian = timeInArray[1] == 'PM' ? 12 : 0;
    let timeWithoutMeridian = timeInArray[0].split(':');
    let hours = parseInt(timeWithoutMeridian[0]) == 12 ? 0 : parseInt(timeWithoutMeridian[0]);
    return (parseInt(timeWithoutMeridian[1]) + (hours + meridian) * 60)
  }

  submit(data:any, id:any) {
    switch (data.mode) {
      case 'add':
        return this.apiService.create(this.converter.getPathParam([AppConstants.APPLICANTS, id, 'stages']), data.stage);
      case 'edit':
        return this.apiService.update(this.converter.getPathParam(['applicant_stage_interviews', id]), data.stage);
      case 'add remarks':
        return this.apiService.create('applicant_stage_reviews', data.stage);
    }
  }
}