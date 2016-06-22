import { Component } from '@angular/core';

@Component({
  selector: 'drop-down-list',
  template: require('./dropDownList.component.html')
})

export class DropDownList {
  logout() {
    localStorage.setItem('access_token', null);
    localStorage.setItem('refresh_token', null);
    window.location.href = window.location.origin + '/auth';
  }
}