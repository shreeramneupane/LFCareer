import { Component } from '@angular/core';
import { App }       from '../../../assets/javascripts/app';
@Component({
  selector   : 'hamburger',
  templateUrl: 'app/shared/components/header/hamburger/hamburger.component.html',
})

export class Hamburger {
  constructor(private app:App) {
  }

  toggleSidebar() {
    this.app.handleSidebar('toggle-sidebar', null);
  }

}