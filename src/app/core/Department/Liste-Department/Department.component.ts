import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent, ConfirmDialogModel } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { Department } from 'src/app/core/Department/DepartmentModel/Department.model';
import { DataService } from 'src/app/services/data.service';

import { NotificationService } from 'src/app/services/notification.service';
import { DepartmentService } from '../DepartmentService/department.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AddDeparmentComponent } from '../add-Department/add-Department.component';
import { EditDeparmentComponent } from '../edit-Department/edit-Department.component';


@Component({
  selector: 'app-indicator',
  templateUrl: './Department.component.html',
  styleUrls: ['./Department.component.scss']
})
export class DeparmentComponent implements OnInit {

  @ViewChild(MatSort, { static: false })
  sort!: MatSort; // Keep this single declaration and remove the duplicate
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  displayedColumns: string[] = ['departmentName', 'departmentAdmin', 'numberOfEmployees', 'Action'];
  dataSource = new MatTableDataSource<any>();
  isShow: boolean = false;
  isupShow: boolean = true;
  searchForm!: FormGroup;
  list: Array<any> = [];
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private DepartmentService: DepartmentService,
    private router: Router,
    private notificationService: NotificationService,
    private dataService: DataService

  ) {}
  ngOnInit(): void {
    this.getAllDempartments()


  this.searchForm =  new FormGroup({
    departmentName: new FormControl('')
     })
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}


  previousSearch()
  {
    this.isShow = !this.isShow;
    this.isupShow = !this.isupShow;
   }
onreset() {
  this.searchForm.reset();
  this.getAllDempartments()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllDempartments() {
    this.DepartmentService.getAllDempartments().subscribe((data: any) => {
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


        this.DepartmentService.actionDempartment(index,action).subscribe((data: any[]) => {

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
  addDepartement(){
    this.Openpopup_Add_Department(0, 'Add Department',AddDeparmentComponent);
  }

  Openpopup_Add_Department(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '27%',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllDempartments()
    })
  }
  editdepartment(id:any,departmentName:any,departmentAdmin:any){
    this.Openpopup_Edit_Department(id, 'Edit Department',departmentName,departmentAdmin,EditDeparmentComponent);
  }
  Openpopup_Edit_Department(code: any, title: any,departmentName:any,departmentAdmin:any,component:any){
    var _popup = this.dialog.open(component, {
      width: '27%',
      data: {
        title: title,
        code: code,
        departmentName:departmentName,
        departmentAdmin:departmentAdmin
      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllDempartments()

    })
  }
}
