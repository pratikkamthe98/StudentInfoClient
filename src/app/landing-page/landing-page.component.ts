import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CovidService } from '../covid.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  submitted: boolean = false;
  countryForm: FormGroup;
  data: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private covidService: CovidService) { }

  settings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,

    },

    columns: {
      CountryCode: {
        title: 'Country Code',
        editable: false,
        filter: false,
      },
      City: {
        title: 'City',
        editable: false,
        filter: false,
      },
      Confirmed: {
        title: 'Confirmed',
        editable: false,
        filter: false,
      },
      Deaths: {
        title: 'Deaths',
        editable: false,
        filter: false,
      },
      Recovered: {
        title: 'Recovered',
        editable: false,
        filter: false,
      },
      Active: {
        title: 'Active',
        editable: false,
        filter: false,
      },




    }, attr: {
      class: 'table table-bordered'
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  ngOnInit() {
    this.countryForm = this.formBuilder.group({
      country: ['', Validators.required],

    });



  }

  get f() { return this.countryForm.controls; }
  submit() {
    let country = this.f.country.value;
    this.getCountryData(country);
  }
  getCountryData(countryName: String) {
    this.covidService.getData(countryName).subscribe((response) => {
      console.log(response);
      this.data = response;

    }, error => {
      console.error(error);
    });

  }

}
