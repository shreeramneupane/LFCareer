import { Component } from '@angular/core';
import { DropDownList } from './dropDownList.component';
import { Searchbar } from './searchbar.component';
import { Hamburger } from './hamburger.component';

@Component({
  selector: 'header-top',
  templateUrl: 'app/components/commons/header/header.component.html',
  directives: [DropDownList, Searchbar, Hamburger]
})

export class Header {

}