import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { appRoutes } from 'src/app/models/routeInfo';
import { AuthService } from './../../../services/authentication/auth.service';
import Ws from '@adonisjs/websocket-client';
import { environment } from '../../../../environments/environment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notifications = +localStorage.getItem('notifications');
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private listTitles: any[];
  location: Location;
  durationInSeconds = 5;
  mobileMenuVisible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  constructor(location: Location,
              private snackBar: MatSnackBar,
              private authSvc: AuthService,
              private element: ElementRef,
              private router: Router) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.getRoutes();
    this.wsConnect();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(() => {
        toggleButton.classList.add('toggled');
      }, 500);

    body.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle() {
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];
    const $layer = document.createElement('div');
    if (this.mobileMenuVisible) {
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(() => {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobileMenuVisible = 0;
    } else {
      setTimeout(() => {
        $toggle.classList.add('toggled');
      }, 430);

      $layer.setAttribute('class', 'close-layer');
      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(() => {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function() {
        body.classList.remove('nav-open');
        this.mobileMenuVisible = 0;
        $layer.classList.remove('visible');
        setTimeout(() => {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobileMenuVisible = 1;
    }
  }

  getRoutes() {
    this.listTitles = appRoutes.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe(() => {
      this.sidebarClose();
      const $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobileMenuVisible = 0;
      }
    });
  }

  logout(): void {
    this.authSvc.logout().subscribe(res => {
      if (res.success) {
        this.router.navigate(['/login']);
      }
    });
  }

  wsConnect() {
    const ws = Ws(environment.apiUrlWS, {path: 'ws'});
    ws.connect();
    ws.on('open', () => {
      const channel = ws.subscribe('notification');
      channel.on('new:notification', () => {
        localStorage.removeItem('notifications');
        this.notifications++;
        localStorage.setItem('notifications', this.notifications.toString());
        this.openSnackBar();
      });
    });

    ws.on('error', (error) => {
      console.log(error);
    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['notification']
    });
  }
}
