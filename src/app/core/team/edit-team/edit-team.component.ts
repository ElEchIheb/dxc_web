import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamService } from '../teamService/team.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../user/userService/user.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
  myform!: FormGroup;
  inputdata: any;
  collaboratorsSelected:any;


  teamMember: { id: any, fullName: any, teamId?: any }[] = [];
  collaboratorsObj:{ id: any }[] = [];
  userOptions: { value: number, label: string }[] = [];
  searchTerm: string = ''; // Holds the value typed by the user // All available options
  filteredOptions: any[] = [];
  selectedCategory: any;
  teamMemberId: any[] = [];
  selectedCityIds:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditTeamComponent>, private Formbuilder: FormBuilder,
    private teamservice: TeamService, private snackBar: MatSnackBar, private userService: UserService) {
    this.filteredOptions = this.userOptions;
  }


  ngOnInit(): void {
    this.inputdata = this.data;
    this.selectedCategory = this.inputdata.manager;
    this.myform = this.Formbuilder.group({
      teamName: [this.inputdata.teamName, Validators.required],
      newManagerId: [this.inputdata.manager, [Validators.required]],
      Collaborators:[this.teamMemberId],

    });
    this.fetchUsersOptions();
    this.fetchteamOptions();

    this.selectedCityIds = new FormControl(this.teamMemberId);
    console.log(this.teamMemberId);
    this.collaboratorsSelected=this.myform.get('Collaborators');



  }
  Cancel() {
    this.ref.close('Closed using function');
  }
  filterOptions() {
    this.filteredOptions = this.userOptions.filter(option =>
      option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  fetchUsersOptions() {
    this.teamservice.getTeamById(this.inputdata.code).subscribe(
      (data: any) => {
        this.userOptions = data.map((item: { id: Number; fullName: String; }) => ({ value: item.id, label: item.fullName }));;
      },
      (error) => {
        console.error('Error fetching options:', error);
      }
    );
  }
  fetchteamOptions() {

    this.teamservice.getTeamById(this.inputdata.code).subscribe(
      (data: any) => {

      this.teamMember = data;
      for(let i of this.teamMember){
        if(i.teamId){
          this.teamMemberId.push(i.id);
        }

      }
     /* const memberIds = this.teamMember.map(member => member.id);
      this.myform.get('Collaborators')?.setValue(memberIds);
*/
      console.log("collab :",this.myform.get('Collaborators')?.value);
      },
      (error) => {
        console.error('Error fetching options:', error);
      }
    );
  }
  UpdateTeam() {
    console.log(this.myform.get('Collaborators')?.value)

    this.collaboratorsObj=this.myform.value.Collaborators.map((item:any)=>({id:item}))
    console.log("ff",this.collaboratorsObj)
    this.myform.value.Collaborators=this.collaboratorsObj
    console.log("liste :",this.myform.value)
    this.teamservice.updateTeam(this.inputdata.code,this.myform.value ).subscribe((res) => {
      const message = ` Team edited successfully`;
      this.snackBar.open(message, '', {
        duration: 3000,
        panelClass: ['panelClass']
      });
      this.Cancel();
    });
  }
}
