import { Component }    from '@angular/core';
import { DropDownList } from './drop-down-list/dropDownList.component.ts';
import { Hamburger }    from './hamburger/hamburger.component.ts';

@Component({
  selector: 'header-top',
  templateUrl: 'app/shared/components/header/header.component.html',
  directives: [DropDownList, Hamburger]
})

export class Header {

}