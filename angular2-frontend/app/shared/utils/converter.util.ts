import { Injectable } from '@angular/core';

@Injectable()
export class Converter {
  serialize(data):string {
    if (typeof(data) != 'object') {
      return '?' + data;
    }
    var str = [];
    for (var p in data) {
      if (data[p] instanceof Array) {
        data[p].forEach(function (entry) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(entry));
        });
      }
      else if (data[p] && data.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
      }
    }
    return '?' + str.join('&');
  }

  getPathParam(params):string {
    return params.join('/');
  }
}