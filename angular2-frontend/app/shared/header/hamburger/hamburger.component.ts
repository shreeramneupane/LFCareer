import { Component } from '@angular/core';

@Component({
  selector: 'hamburger',
  templateUrl: 'app/shared/header/hamburger/hamburger.component.html'
})

export class Hamburger {
  toggleSidebar() {
    App.sidebar('toggle-sidebar');
  }

}