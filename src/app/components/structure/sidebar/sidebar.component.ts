import { Component, OnInit } from '@angular/core';
import { RouteInfo, appRoutes } from './../../../models/routeInfo';

declare const $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];
  constructor() { }

  ngOnInit() {
    this.menuItems = appRoutes.filter(listTitle => listTitle);;
  }

  isMobileMenu(): boolean {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
