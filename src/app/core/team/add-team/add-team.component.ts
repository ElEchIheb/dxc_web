import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user/userService/user.service';
import { TeamService } from '../teamService/team.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  inputdata: any;
  editdata: any;
  AddTeamForm!: FormGroup;
  closemessage = 'closed using directive'
options: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<AddTeamComponent>, private buildr: FormBuilder,
    private teamservice: TeamService,private snackBar: MatSnackBar,private userService:UserService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;


  }



  Cancel() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    teamName: [null, Validators.compose([Validators.required])],
  });

  Savedeparment() {
    this.teamservice.createTeam(this.myform.value).subscribe(res => {
      const message = ` Team added successfully`;
      this.snackBar.open(message, '', {
        duration: 3000,
        panelClass: ['panelClass']
      });
      this.Cancel();
    });
  }}

