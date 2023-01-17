import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class FromComponent {
  allDesignation: any = ['Manager', 'Developer', 'Tester', 'HR', 'DevOps'];
  editIndex: null | number = null;
  Employee = new FormGroup({
    name: new FormControl(''),
    salary: new FormControl(''),
    Designation: new FormControl(''),
  });
  EmployeesList: any = [];
  constructor() {
    this.EmployeesList = localStorage['Employee']
      ? JSON.parse(localStorage['Employee'])
      : [];
  }
  onSubmit(): void {
    let emp = {
      name: this.Employee.get('name')?.value,
      Designation: this.Employee.get('Designation')?.value,
      salary: this.Employee.get('salary')?.value,
    };
    let newList = [...this.EmployeesList];
    if (this.editIndex === null) {
      newList = [...newList, emp];
    } else {
      newList.splice(this.editIndex, 1, emp);
      this.editIndex = null;
    }
    this.EmployeesList = newList;
    localStorage.setItem('Employee', JSON.stringify(newList));
    this.onReset();
  }
  onReset(): void {
    this.Employee = new FormGroup({
      name: new FormControl(''),
      salary: new FormControl(''),
      Designation: new FormControl(''),
    });
  }
  onDelete(index: number): void {
    let newList = [...this.EmployeesList];
    newList.splice(index, 1);
    this.EmployeesList = newList;
    localStorage.setItem('Employee', JSON.stringify(newList));
  }
  onEdit(index: number): void {
    this.editIndex = index;
    let data = this.EmployeesList[index];
    this.Employee = new FormGroup({
      name: new FormControl(data.name),
      salary: new FormControl(data.salary),
      Designation: new FormControl(data.Designation),
    });
  }
}
