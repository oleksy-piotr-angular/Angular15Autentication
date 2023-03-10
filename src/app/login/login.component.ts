import { AuthService } from '../service/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  userData: any;

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });
  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService
        .getByCode(this.loginForm.value.userName)
        .subscribe((res) => {
          this.userData = res;
          console.log(this.userData);
          if (this.userData.password === this.loginForm.value.password) {
            if (this.userData.isActive) {
              sessionStorage.setItem('userName', this.userData.id);
              sessionStorage.setItem('userRole', this.userData.role);
              this.router.navigate(['']);
            } else {
              this.toastr.error('Please contact admin', 'In Active User');
            }
          } else {
            this.toastr.error('Invalid Credentials');
          }
        });
    }
  }
}
