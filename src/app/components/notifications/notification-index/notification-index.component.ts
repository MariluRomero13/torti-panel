import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDetailComponent } from './../notification-detail/notification-detail.component';
import { NotificationService } from './../../../services/notification.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-notification-index',
  templateUrl: './notification-index.component.html',
  styleUrls: ['./notification-index.component.css']
})
export class NotificationIndexComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  notificationColumns: string[] = ['employee', 'phone', 'email', 'requested', 'description'];
  constructor(private dialog: MatDialog, private notificationSvc: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  ngAfterViewInit() {
    interval(30000).subscribe(() => this.getNotifications());
  }

  private getNotifications(): void {
    this.notificationSvc.index().subscribe(notifications => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = notifications;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
