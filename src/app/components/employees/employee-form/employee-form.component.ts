import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { employeeMessages } from './../../../functions/messages';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeId: number;
  userForm: FormGroup;
  employeeForm: FormGroup;
  validationMessages = employeeMessages;
  constructor(private active: ActivatedRoute) { this.createForm(); }

  ngOnInit(): void {
    this.employeId = this.active.snapshot.params.id;
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
      role: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  store(): void {}

  update(): void {}
}
