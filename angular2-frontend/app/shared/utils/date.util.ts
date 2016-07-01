import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateUtil {
  getFormattedDate(date):string {
    return moment(date).format("MMM Do YYYY");
  }

  getRelativeDate(date:any):string {
    let duration:any = moment.duration(moment().diff(date));
    if (duration.asWeeks() > 1) {
      return this.getFormattedDate(date);
    } else {
      return moment(date).fromNow();
    }
  }
}