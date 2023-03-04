import { UpdatePopUpComponent } from './../update-pop-up/update-pop-up.component';
import { AuthService } from './../service/auth.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent {
  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadUser() {
    this.authService.getAll().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    'userName',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];
  updateUser(code: any) {
    this.dialog.open(UpdatePopUpComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        userCode: code,
      },
    });
  }

  openDialog() {}
}
