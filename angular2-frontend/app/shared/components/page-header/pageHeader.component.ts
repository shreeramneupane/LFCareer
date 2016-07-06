import { Component, Input } from '@angular/core';
import { BreadCrumbComponent } from '../breadCrumb/breadCrumb.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector  : 'page-header',
  template  : require('./pageHeader.component.html'),
  directives: [BreadCrumbComponent],
  providers : [Title]
})

export class PageHeader {
  @Input() pageHeader:string;
  @Input() breadCrumb:any;
  @Input() title:string;

  constructor(private pageTitle:Title) {
  }

  ngOnChanges() {
    this.pageTitle.setTitle(this.title || 'Leapfrog Recruitment System');
  }
}