import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modif-bull',
  templateUrl: './modif-bull.component.html',
  styleUrls: ['./modif-bull.component.scss']
})
export class ModifBullComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.myForm = this.formBuilder.group({
      marque: ['', Validators.required],
      refBS: ['', Validators.required],
      nomAdherent: ['', Validators.required],
      prenomMalade: ['', Validators.required],
      dateSoins: ['', Validators.required],
      honoraires: [''],
      pharmacie: [''],
      // Add other form controls here as needed
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      // Send form data to the backend API
      this.http.post<any>('/api/bulletin-soins', formData).subscribe(
        (response) => {
          console.log('Form submission successful:', response);
          // Reset the form after successful submission
          this.myForm.reset();
        },
        (error) => {
          console.error('Error submitting form:', error);
          // Handle error here
        }
      );
    }
  }
}
