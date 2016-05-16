import { Component } from '@angular/core';
import { DropDownList } from './drop-down-list/dropDownList.component.ts';
import { Searchbar } from './searchbar/searchbar.component.ts';
import { Hamburger } from './hamburger/hamburger.component.ts';

@Component({
  selector: 'header-top',
  templateUrl: 'app/components/commons/header/header.component.html',
  directives: [DropDownList, Searchbar, Hamburger]
})

export class Header {

}