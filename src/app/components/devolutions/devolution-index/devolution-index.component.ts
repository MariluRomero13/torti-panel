import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DevolutionService } from './../../../services/devolution.service';
import { DevolutionFormComponent } from './../devolution-form/devolution-form.component';
@Component({
  selector: 'app-devolution-index',
  templateUrl: './devolution-index.component.html',
  styleUrls: ['./devolution-index.component.css']
})
export class DevolutionIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  devolutionsColumns: string[] = ['employee','customer','product','quantity','options']
  constructor(private dialog: MatDialog, private devolutionSvc: DevolutionService) { }

  ngOnInit(): void {
    this.getDevolutions();
  }

  private getDevolutions(): void {
    this.devolutionSvc.index().subscribe(devolutions => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = devolutions;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDevolutionDialog(devolution): void {
    const dialog = this.dialog.open(DevolutionFormComponent, {
      width: 'auto',
      height: 'auto',
      data: { devolution }
    });
    dialog.afterClosed().subscribe(() => {
      this.getDevolutions();
    });
  }

  searchDevolution = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
