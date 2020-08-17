import { Component, OnInit,ElementRef, ViewChild,Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-devolution-form',
  templateUrl: './devolution-form.component.html',
  styleUrls: ['./devolution-form.component.css']
})
export class DevolutionFormComponent implements OnInit {
  description:any;
  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.description=this.data.devolution.description
  }

}
