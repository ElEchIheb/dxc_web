import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

 import { FormControl, FormGroup } from '@angular/forms';
 import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
 import { ConfirmDialogModel,ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { DataService } from 'src/app/services/data.service';
import { AddPosteComponent } from '../add-poste/add-poste.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PosteService } from '../posteService/poste.service';
import { EditPosteComponent } from '../edit-poste/edit-poste.component';
import { Poste } from '../posteModel/poste.model';

@Component({
  selector: 'app-tools',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})

export class PosteComponent implements OnInit {
  @ViewChild(MatSort, { static: false })
  sort!: MatSort; // Keep this single declaration and remove the duplicate
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  displayedColumns: string[] = ['posteName', 'sickLeave', 'leave', 'status'];
  dataSource = new MatTableDataSource<Poste>();
  isShow: boolean = false;
  isupShow: boolean = true;
  searchForm!: FormGroup;
  list: Array<any> = [];
  selectedLanguage: any;
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private PosteService: PosteService,
    private router: Router,
    private notificationService: NotificationService,

  )
  {

  }
  ngOnInit(): void {
    this.getAllPostes()

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
  this.getAllPostes()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllPostes() {
    this.PosteService.getAllpostes().subscribe((data: any) => {
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


        this.PosteService.ActivetOrDisactivetposte(index,action).subscribe((data: any[]) => {

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
  addposte(){
    this.Openpopup_Add_Poste(0, 'Add Poste',AddPosteComponent);
  }

  Openpopup_Add_Poste(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '27%',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllPostes()
    })
  }
  editposte(id:any,posteName:any,sickLeave:any,leave:any){
    this.Openpopup_Edit_Poste(id, 'Edit Poste',posteName,sickLeave,leave,EditPosteComponent);
  }
  Openpopup_Edit_Poste(code: any, title: any,posteName:any,sickLeave:any, leave:any , component:any ) {
    var _popup = this.dialog.open(component, {
      width: '27%',
      data: {
        title: title,
        code: code,
        posteName:posteName,
        sickLeave:sickLeave,
        leave:leave
      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllPostes()

    })
  }
}
