import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { CampagneService } from '../campagneService/campagne.service';
import { AddCampagneComponent } from '../add-campagne/add-campagne.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Campagne } from '../campagne-Model/campagne.model';


@Component({
  selector: 'app-user',
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.scss']
})
export class  CampagneComponent implements OnInit {

  allComplete: boolean = false;

  completedIds: number[] = [];
  dataSource = new MatTableDataSource<Campagne>();
  displayedColumns: string[] = ['year', 'id', 'billFrom', 'status', 'totalCost', 'billTo'];

  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);
  constructor(private campagneService: CampagneService,private snackBar: MatSnackBar,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getAllCampagnes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAllCampagnes() {
    this.campagneService.getAllCampagnes().subscribe((data: any) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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


        this.campagneService.ActivetOrDisactivetCampagne(index,action).subscribe((data: any[]) => {

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
  addCampagne(){
    this.Openpopup_Add_Campagne(0, 'Add Campagne',AddCampagneComponent);
  }

  Openpopup_Add_Campagne(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '27%',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllCampagnes();
    })
  }
}
