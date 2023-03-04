import { AuthService } from './../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { User } from '../models/user';

@Component({
  selector: 'app-update-pop-up',
  templateUrl: './update-pop-up.component.html',
  styleUrls: ['./update-pop-up.component.css'],
})
export class UpdatePopUpComponent implements OnInit {
  /* editData: User; */
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    /* this.authService.getAllRole().subscribe((res) => {
      this.roleList = res;
    }); */
    /* if (this.data.userCode != null && this.data.userCode != '') {
      this.authService.getByCode(this.data.userCode).subscribe((res) => {
        const editData = res;
        this.registerForm.setValue({
          id: editData.id,
          name: editData.name,
          password: editData.password,
          email: editData.email,
          gender: editData.gender,
          role: editData.role,
          isActive: editData.isActive,
        });
      });
    } */
  }

  roleList: any;

  registerForm = this.builder.group({
    id: this.builder.control<string>(''),
    name: this.builder.control<string>(''),
    password: this.builder.control<string>(''),
    email: this.builder.control<string>(''),
    gender: this.builder.control<string>('male'),
    role: this.builder.control<string>('', Validators.required),
    isActive: this.builder.control<boolean>(false),
  });

  updateUser() {}
}
