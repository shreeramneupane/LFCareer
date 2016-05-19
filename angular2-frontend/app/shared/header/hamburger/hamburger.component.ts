import { Component } from '@angular/core';

@Component({
  selector: 'hamburger',
  templateUrl: 'app/components/commons/header/hamburger/hamburger.component.html'
})

export class Hamburger {
  toggleSidebar() {
    App.sidebar('toggle-sidebar');
  }

}