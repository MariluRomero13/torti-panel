import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotificationDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { dialogRef.disableClose = true; }

  ngOnInit(): void {
  }

}
