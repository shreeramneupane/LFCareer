import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import {AppConstants} from "../../constants/app.constants";

@Component({
  selector: 'pagination',
  template: require('./pagination.component.html'),
  styles  : [require('./pagination.component.css')]
})

export class Pagination implements OnChanges {
  currentPage:number = 1;

  @Input() totalCount:number;
  @Output() refreshList = new EventEmitter();

  totalPages:number;

  constructor() {
  }

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalCount / AppConstants.OFFSET);
  }

  range = (value) => {
    let a = [];
    for (let i = 0; i < value; ++i) {
      a.push(i + 1)
    }
    return a;
  }

  prevPage():void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.refreshList.emit(this.currentPage);
    }
  }

  nextPage():void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.refreshList.emit(this.currentPage);
    }
  }

  changePage(pageNumber):void {
    if (this.currentPage != pageNumber) {
      this.currentPage = pageNumber;
      this.refreshList.emit(this.currentPage);
    }
  }
}