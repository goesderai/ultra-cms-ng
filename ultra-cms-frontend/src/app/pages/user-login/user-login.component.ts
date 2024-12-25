import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {CommonModule} from '@angular/common';
import {response} from 'express';

@Component({
  selector: 'app-user-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  standalone: true,
  providers: [
    UserService
  ],
})
export class UserLoginComponent {

  loginForm: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        identifier: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      try {
        const response = await this.userService.authenticate(credentials);

        if (response.status === 200 && response.data) {
          console.log(response.data);
          this.successMessage = 'Login successful, redirecting to dashboard...';
          //todo: store jwt token (response.data.jwt) and user data (response.data.user) to session and then redirect to dashboard
        }
      } catch (e: any) {
        this.errorMessage = e.response.data?.error?.message;
      }
    } else {
      console.error('User login failed.');
    }
  }

}
