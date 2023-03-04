import { AuthService } from '../service/auth.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormUserModel } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.builder.group({
      id: this.builder.nonNullable.control<string>(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      name: this.builder.control<string>('', Validators.required),
      password: this.builder.control<string>(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ])
      ),
      email: this.builder.control<string>(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      gender: this.builder.control<string>('male'),
      role: this.builder.control<string>(''),
      isActive: this.builder.control<boolean>(false),
    });
  }

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.authService
        .proceedRegister(this.registerForm.value)
        .subscribe((res) => {
          this.toastr.success(
            'Please contact admin for enable access',
            'Registered Successfully'
          );
          this.router.navigate(['login']);
        });
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
