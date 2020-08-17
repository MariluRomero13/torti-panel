import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { confirmMessage, successMessage } from 'src/app/functions/alerts';
import { AssignmentProductService } from 'src/app/services/assignment-product.service';
import { AssignmentproductFormComponent } from './../assignmentproduct-form/assignmentproduct-form.component';

@Component({
  selector: 'app-assignmentproduct-index',
  templateUrl: './assignmentproduct-index.component.html',
  styleUrls: ['./assignmentproduct-index.component.css']
})
export class AssignmentproductIndexComponent implements OnInit {
  @ViewChild('paginator', {static : true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  dataSource: any;
  assignmentproductColumns: string[] = ['employee','product','quantity','options'];
  constructor(private dialog: MatDialog, private assignmentproductSvc: AssignmentProductService) { }

  ngOnInit(): void {
    this.getAssignmentProducts();
  }

  private getAssignmentProducts(): void {
    this.assignmentproductSvc.index().subscribe(assignmentsproducts => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = assignmentsproducts;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  searchAssignmentProduct = (filterValue: string) => {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  openAssignmentProductDialog(edit, assignmentproduct): void{
    console.log("al abrir dialog",assignmentproduct);
    
    const dialog = this.dialog.open(AssignmentproductFormComponent,{
      width: 'auto',
      height: 'auto',
      data: { edit, assignmentproduct }
    })
    dialog.afterClosed().subscribe(() => {
      this.getAssignmentProducts();
    });
  }

}
