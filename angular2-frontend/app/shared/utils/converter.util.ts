import { Injectable } from '@angular/core';

@Injectable()
export class Converter {
  serialize(data):string {
    if (typeof(data) != 'object') {
      return '?' + data;
    }
    console.log(data.hasOwnProperty('start'))
    var str = [];
    for (var p in data) {
      if (data[p] != null && data.hasOwnProperty(p)) {
        console.log(p, data[p])
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
      }
    }
    return '?' + str.join('&');
  }

  getPathParam(params):string {
    return params.join('/');
  }
}