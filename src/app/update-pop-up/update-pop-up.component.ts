import { ToastrService } from 'ngx-toastr';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatePopUpComponent>
  ) {}
  roleList: any;
  editData: any;
  ngOnInit(): void {
    this.authService.getAllRole().subscribe((res) => {
      this.roleList = res;
    });
    if (this.data.userCode != null && this.data.userCode != '') {
      console.log('data.userCode:' + this.data.userCode);
      this.loadUserData(this.data.userCode);
    }
  }

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control(''),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false),
  });

  loadUserData(code: any) {
    this.authService.getByCode(code).subscribe((res) => {
      this.editData = res;
      console.log(this.editData);
      this.registerForm.setValue({
        id: this.editData.id,
        name: this.editData.name,
        password: this.editData.password,
        email: this.editData.email,
        gender: this.editData.gender,
        role: this.editData.role,
        isActive: this.editData.isActive,
      });
    });
  }

  updateUser() {
    if (this.registerForm.valid) {
      this.authService
        .updateUser(this.registerForm.value.id, this.registerForm.value)
        .subscribe((res) => {
          this.toastr.success('Updated successfully.');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please select Role.');
    }
  }
}
