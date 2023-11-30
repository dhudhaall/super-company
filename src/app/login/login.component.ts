import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class LoginComponent {

  isSubmitted: boolean = false

  loginform: FormGroup;
  constructor(private fb:FormBuilder, private router:Router) {
    this.loginform = fb.group({
      username:['' , Validators.required],
    })
  }

  onSubmit(){
    this.isSubmitted = true
    if (this.loginform.valid) {
      localStorage.setItem('username', JSON.stringify(this.loginform.value))
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
  }

}
