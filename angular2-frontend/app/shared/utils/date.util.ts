import * as moment from 'moment';

export class DateUtil {
  getFormattedDate(date):string {
    return moment(date).format("MMM Do YYYY");
  }
}