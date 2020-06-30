import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDetailComponent } from './../notification-detail/notification-detail.component';

@Component({
  selector: 'app-notification-index',
  templateUrl: './notification-index.component.html',
  styleUrls: ['./notification-index.component.css']
})
export class NotificationIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  notificationColumns: string[] = ['employee', 'phone', 'email', 'requested', 'description'];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  private getNotifications(): void {
    const notifications = [
      { employee: 'Pablo Luna', phone: '8715422396', email: 'pabloLuna@example.com', requested: 'Hace 5 minutos' },
      { employee: 'Juan García Gómez', phone: '8790345678', email: 'juanGa@example.com', requested: 'Hace 10 minutos' }
    ];
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = notifications;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCommentForm(notification): void {
    this.dialog.open(NotificationDetailComponent, {
      width: '400px',
      height: 'auto',
      data: notification
    });
  }

  searchNotification = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
