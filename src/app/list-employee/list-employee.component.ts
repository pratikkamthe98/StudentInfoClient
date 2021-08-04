import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CovidService } from '../covid.service';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employeesData: any = []

  constructor(private router: Router, private covidService: CovidService) { }
  settings = {
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true
    },
    delete: {
      confirmDelete: true,
    },


    columns: {
      name: {
        title: 'Employee Name',
        editable: true,
        filter: false
      },




    },
    attr: {
      class: 'table table-bordered'
    },
    pager: {
      display: true,
      perPage: 5
    }
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }
  onConfirmDelete(event) {
    console.log(event);
    this.covidService.deleteEmployee(event.data.id).subscribe((response) => {
      console.log(response);
      event.confirm.resolve(event.newData);
      this.settings = Object.assign({}, this.settings);
    }, error => {
      console.error(error);
      event.confirm.reject();
      alert("Error in Deleteing Employee Record");
    }
    );
  }
  onItemCreated(event) {
    console.log("Item Created");
    console.log(event);
    if (event.newData.name) {
      this.covidService.addEmployee(event.newData).subscribe((response) => {
        console.log(response);
        event.confirm.resolve(event.newData);
        this.settings = Object.assign({}, this.settings);
        alert("Employee Record Saved Successfully");
      }, error => {
        console.error(error);
        event.confirm.reject();
        alert("Error in Saving Employee Record");
      }
      );
    }
    else {
      alert("Invalid Employee details. Please re-enter");
    }
  }
  onItemEdited(event) {
    this.covidService.updateEmployee(event.data.id, event.newData).subscribe((response) => {
      console.log(response);
      event.confirm.resolve(event.newData);
      this.settings = Object.assign({}, this.settings);
      alert('Employee Record Updated Successfully');

    }, error => {
      console.error(error);
      event.confirm.reject();
    });
  }



  getEmployeeData() {
    this.covidService.getEmployeesData().subscribe((response) => {
      console.log(response);
      this.employeesData = response;

    }, error => {
      console.error(error);
    });

  }


}
