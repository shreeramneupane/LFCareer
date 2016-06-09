import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  template: require('./pageHeader.component.html')
})

export class PageHeader {
  @Input() pageHeader:string;
}