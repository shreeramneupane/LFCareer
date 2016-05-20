import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: 'app/shared/page-header/pageHeader.component.html'
})

export class PageHeader {
@Input() pageHeader: string;
}