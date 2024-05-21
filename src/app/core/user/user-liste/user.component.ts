import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import swal from 'sweetalert2';
import { ConfirmDialogModel,ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataService } from 'src/app/services/data.service';
import { PosteService } from '../../poste/posteService/poste.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UserService } from '../userService/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proc',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(MatSort, { static: false })
  sort!: MatSort; // Keep this single declaration and remove the duplicate
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  displayedColumns: string[] = ['fullName', 'email', 'telephone','role','department', 'Action'];
  dataSource = new MatTableDataSource<any>();
  isShow: boolean = false;
  isupShow: boolean = true;
  searchForm!: FormGroup;
  apiURL = environment.apiUrl+"/";
  list: Array<any> = [];
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private UserService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private dataService: DataService

  ) {}
  ngOnInit(): void {
    this.getAllUsers()


    this.searchForm =  new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('' ),
      role: new FormControl(''),
      department: new FormControl(''),
      poste: new FormControl(''),
     })
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
onSubmitsearch()
{
 this.UserService.getuserSearch(this.searchForm.value).subscribe((data: any) => {
   this.dataSource = data;
 });}

  previousSearch()
  {
    this.isShow = !this.isShow;
    this.isupShow = !this.isupShow;
   }
onreset() {
  this.searchForm.reset();
  this.getAllUsers()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllUsers() {
    this.UserService.getAllUsers().subscribe((data: any) => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  refresh(): void {
    window. location.reload();
    }

    notifyError(): void {
      this.notificationService.error('Error!');
    }


    notifySuccess(): void {
      this.notificationService.success("Ligne supprimé  avec Succes !");
    }

    filter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  confirmStatus(event: MatSlideToggleChange, index: any): void {
    const action = event.checked ? 'activate' : 'deactivate';
  const message = `Are you sure you want to ${action} this line?`;


    const dialogData = new ConfirmDialogModel("Confirmation", message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '25%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean)  => {
      if (confirmed ) {
        const action = event.checked


        this.UserService.actionUser(index,action).subscribe((data: any[]) => {

          data = this.dataSource.data;
          this.dataSource.data = data;
          const actionMessage = event.checked ? 'Activated' : 'Desactivated';
          const message = `${actionMessage} successfully`;
          this.snackBar.open(message, '', {
            duration: 3000,
            panelClass: ['panelClass']
          });
        });
      }


    });
  }
  addUser(){
    this.Openpopup_Add_User(0, 'Add User',AddUserComponent);
  }

  Openpopup_Add_User(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '50%',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllUsers()
    })
  }
  editUser(code:any,firstName:any,lastName:any,poste:any,telephone:any,posteId:any){
    this.Openpopup_Edit_User(code, 'Edit User',firstName,lastName,poste,telephone,posteId, EditUserComponent);
  }
  Openpopup_Edit_User(code: any, title: any,firstName:any,lastName:any,poste:any, telephone:any,posteId:any , component:any ) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      data: {
        title: title,
        code: code,
        firstName:firstName,
        lastName:lastName,
        poste:poste,
        posteId:posteId,
        telephone:telephone
      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllUsers()

    })
  }
}
