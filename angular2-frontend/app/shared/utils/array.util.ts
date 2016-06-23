import { Injectable } from '@angular/core';

@Injectable()
export class ArrayUtil {
  getDiffFromObjectArrays(largerArray:Array<any>, smallerArray:Array<any>, key:string) {
    return largerArray.filter(function (index) {
      for (var i = 0; i < smallerArray.length; i++) {
        if (smallerArray[i][key] == index[key]) {
          return;
        }
      }
      return index;
    });
  }

  filterObjectByKey(objectArray, key, value) {
    return objectArray.filter(function (item) {
      return (item[key] == value)
    });
  }
}