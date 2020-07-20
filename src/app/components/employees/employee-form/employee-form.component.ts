import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { employeeMessages } from './../../../functions/messages';
import { EmployeeService } from './../../../services/employee.service';
import { IEmployee } from './../../../models/employee';
import { successMessage } from 'src/app/functions/alerts';
import { RoleService } from 'src/app/services/role.service';
import { IRole } from './../../../models/role';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeId: number;
  userForm: FormGroup;
  employeeForm: FormGroup;
  employee: IEmployee;
  roles: IRole;
  validationMessages = employeeMessages;
  constructor(private active: ActivatedRoute,
              private roleSvc: RoleService,
              private route: Router,
              private employeeSvc: EmployeeService) { this.createForm(); }

  ngOnInit(): void {
    this.getRoles();
    this.employeeId = this.active.snapshot.params.id;
    if (this.employeeId) {
      this.showEmployee();
    }
  }

  private createForm(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });

    this.employeeForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      paternal: new FormControl('', Validators.compose([Validators.required])),
      maternal: new FormControl('', Validators.compose([Validators.required])),
      role_id: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  private getRoles() {
    this.roleSvc.getRoles().subscribe(res => {
      this.roles = res;
    });
  }

  store(): void {
    this.getEmployeeData();
    this.employeeSvc.store(this.employee).subscribe(res => {
      if (res.status) {
        successMessage('Empleado creado correctamente').then(() => {
          this.clear();
        });
      }
    });
  }

  update(): void {
    this.getEmployeeData();
    this.employeeSvc.update(this.employee).subscribe(res => {
      if (res.status) {
        successMessage('Empleado actualizado correctamente').then(() => {
          this.clear();
        });
      }
    });
  }

  private showEmployee(): void {
    this.employeeSvc.getEmployeeDetails(this.employeeId).subscribe(employee => {
      this.employeeForm.patchValue(employee[0]);
      if (employee[0].user) {
        this.userForm.patchValue(employee[0].user);
        this.userForm.get('password').setValue('12345');
      }
    });
  }

  private getEmployeeData(): void {
    this.employee = {
      ...this.employeeForm.value,
      ...this.userForm.value
    };

    if (this.employee) {
      this.employee.id = this.employeeId;
    }
  }

  private clear() {
    this.employeeForm.reset();
    this.userForm.reset();
    return this.route.navigate(['/panel/empleados']);
  }
}
