import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  studentsData: any = []

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
      studentName: {
        title: 'Name',
        editable: true,
        filter: false
      },
      studentAge: {
        title: 'Age',
        editable: true,
        filter: false
      },
      studentEmail: {
        title: 'Email',
        editable: true,
        filter: false
      },
      studentCity: {
        title: 'Address',
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
    this.getStudentData();
  }
   onConfirmDelete(event) {
    console.log(event);
    this.covidService.deleteStudent(event.data.id).subscribe((response) => {
      console.log(response);
      event.confirm.resolve(event.newData);
      this.settings = Object.assign({}, this.settings);
    }, error => {
      console.error(error);
      event.confirm.reject();
      alert("Error in Deleteing Student Record");
    }
    );
  }
  onItemCreated(event) {
    console.log("Item Created");
    console.log(event);
    if (event.newData.studentName && event.newData.studentAge  && event.newData.studentEmail && event.newData.studentCity) {
      this.covidService.addStudent(event.newData).subscribe((response) => {
        console.log(response);
        event.confirm.resolve(event.newData);
        this.settings = Object.assign({}, this.settings);
        alert("Student Record Saved Successfully");
      }, error => {
        console.error(error);
        event.confirm.reject();
        alert("Error in Saving Student Record");
      }
      );
    }
    else {
      alert("Invalid Student details. Please re-enter");
    }
  }
   onItemEdited(event) {
    this.covidService.updateStudent(event.data.id,event.newData).subscribe((response) => {
      console.log(response);
      event.confirm.resolve(event.newData);
       this.settings = Object.assign({}, this.settings);
      alert('Student Record Updated Successfully');

    }, error => {
      console.error(error);
      event.confirm.reject();
    });
  }


  
  getStudentData() {
    this.covidService.getStudentsData().subscribe((response) => {
      console.log(response);
      this.studentsData = response;

    }, error => {
      console.error(error);
    });

  }


}
