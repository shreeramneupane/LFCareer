import { Component } from '@angular/core';

import { App } from '../../../assets/typescripts/app';

@Component({
  selector: 'hamburger',
  template: require('./hamburger.component.html')
})

export class Hamburger {
  constructor(private app:App) {
  }

  toggleSidebar() {
    this.app.handleSidebar('toggle-sidebar', null);
  }
}