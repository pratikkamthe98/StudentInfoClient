import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ListStudentComponent } from './list-student/list-student.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'list', component: ListStudentComponent },
  { path: 'elist', component: ListEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
