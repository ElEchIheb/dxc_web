import { Component, OnInit, ViewChild } from '@angular/core';
import { AddTeamComponent } from '../add-team/add-team.component';
import { EditTeamComponent } from '../edit-team/edit-team.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ConfirmDialogModel, ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { TeamService } from '../teamService/team.service';

@Component({
  selector: 'app-team-liste',
  templateUrl: './team-liste.component.html',
  styleUrls: ['./team-liste.component.scss']
})
export class TeamListeComponent implements OnInit {

  @ViewChild(MatSort, { static: false })
  sort!: MatSort; // Keep this single declaration and remove the duplicate
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  displayedColumns: string[] = ['teamName', 'manager', 'teamMembers', 'status'];
  dataSource = new MatTableDataSource<any>();
  isShow: boolean = false;
  isupShow: boolean = true;
  searchForm!: FormGroup;
  list: Array<any> = [];
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private TeamService: TeamService,
    private router: Router,
    private notificationService: NotificationService,
    private dataService: DataService

  ) {}
  ngOnInit(): void {
    this.getAllTeams()

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
  this.getAllTeams()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllTeams() {
    this.TeamService.getAllTeams().subscribe((data: any) => {
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


        this.TeamService.ActivetOrDisactivetTeam(index,action).subscribe((data: any[]) => {

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
  addTeam(){
    this.Openpopup_Add_Team(0, 'Add Team',AddTeamComponent);
  }

  Openpopup_Add_Team(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '27%',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllTeams()
    })
  }
  editTeam(id:any,teamName:any,manager:any,managerId:any){
    this.Openpopup_Edit_Team(id, 'Edit Team',teamName,manager,managerId,EditTeamComponent);
  }
  Openpopup_Edit_Team(code: any, title: any,teamName:any,manager:any,managerId:any, component:any ) {
    var _popup = this.dialog.open(component, {
      width: '50%',
      data: {
        title: title,
        code: code,
        teamName:teamName,
        manager:manager,
        managerId:managerId

      }
    });
    _popup.afterClosed().subscribe(item => {

      this.getAllTeams()

    })
  }
}
