import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperService } from '../../super.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  catFact: any = {}
  sunriseSunsetData: any;

  latitude: string = '';
  longitude: string = '';
  date: string = '';

  showError: boolean = false
  sunriseForm!: FormGroup;

  constructor(
    private service: SuperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sunriseForm = fb.group({
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && Object.values(params).length > 0) {
        this.sunriseForm.patchValue({
          latitude: params['latitude'] || '',
          longitude: params['longitude'] || '',
          date: params['date'] || '',
        });
        this.getSunriseSunsetData();
      } else {
        const storedParamsString = localStorage.getItem('sunrise');
        const storedParams = JSON.parse(storedParamsString!);
        if (storedParams && Object.values(storedParams).length > 0) {
          console.log
          this.sunriseForm.patchValue({
            latitude: storedParams['latitude'] || '',
            longitude: storedParams['longitude'] || '',
            date: storedParams['date'] || '',
          });
          this.getSunriseSunsetData();
        }
      }
    });
    this.getCatFact();
  }

  getCatFact() {
    this.service.getCatFact().subscribe((response: any) => {
      this.catFact = response;
    });
  }

  setQueryParamsAndGetData(latitude: string, longitude: string, date: string) {
    const queryParams = { latitude, longitude, date };
    localStorage.setItem('sunrise', JSON.stringify(queryParams));

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  submit() {
    this.showError = true
  }

  getSunriseSunsetData() {
    if (this.sunriseForm.valid) {
      this.service
        .getSunriseSunset(
          this.sunriseForm.value.latitude,
          this.sunriseForm.value.longitude,
          this.sunriseForm.value.date
        )
        .subscribe(
          (response: any) => {
            this.sunriseSunsetData = response.results;
            this.setQueryParamsAndGetData(this.sunriseForm.value.latitude, this.sunriseForm.value.longitude, this.sunriseForm.value.date);
          },
          (error) => {
            console.error('Error fetching sunrise-sunset data', error);
          }
        );
    }
  }

  update() {
    this.getCatFact();
  }

}
