import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentInfo } from './Model/student';
import { EmployeeInfo } from './Model/employee';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  base_path = 'http://localhost:3000/students';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }
  getData(country: String) {
    return this.http.get<any>(`${this.base_path}` + country, this.httpOptions);
  }
  getStudentsData() {
    return this.http.get<any>(`${this.base_path}`, this.httpOptions);
  }
  getEmployeesData() {
    return this.http.get<any>(`${this.base_path}`, this.httpOptions);
  }
  public addStudent(studentInfo: StudentInfo) {
    return this.http.post<any>(`${this.base_path}`, studentInfo, this.httpOptions);
  }
  public addEmployee(employeeInfo: EmployeeInfo) {
    return this.http.post<any>(`${this.base_path}`, employeeInfo, this.httpOptions);
  }

  public deleteStudent(id: Number) {
    return this.http.delete<any>(`${this.base_path}/` + id, this.httpOptions);
  }
  public deleteEmployee(id: Number) {
    return this.http.delete<any>(`${this.base_path}/` + id, this.httpOptions);
  }

  public updateStudent(id: Number, studentInfo: StudentInfo) {
    return this.http.put<any>(`${this.base_path}/` + id + '/', studentInfo, this.httpOptions);
  }
  public updateEmployee(id: Number, employeeInfo: EmployeeInfo) {
    return this.http.put<any>(`${this.base_path}/` + id + '/', employeeInfo, this.httpOptions);
  }
}
