

import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form!: FormGroup;
  errors=""

  constructor(private authservice: AuthService,private formbuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      "emailControl": ['',[Validators.required,Validators.email]],
      "passwordControl": ['',Validators.required],
      "confirmControl":['',Validators.required]
    })
  }

  signupuser(){
    if(this.form.invalid){
      if(this.form.controls['emailControl'].invalid){
        this.errors="invalid email format"
        return
      }
      if(this.form.controls["passwordControl"].invalid){
        this.errors="password missing"
        return
      }
      if(this.form.controls["confirmControl"].invalid || this.form.get("passwordControl")?.value != this.form.get("confirmControl")?.value){
        this.errors="the passwords don't match"
      }
    } else {
      this.errors="";
        console.log("attempting signup: "+this.form.get("emailControl")?.value+" "+this.form.get("passwordControl")?.value)
        this.authservice.signup(this.form.get("emailControl")?.value,this.form.get("passwordControl")?.value).subscribe({
          next: ()=>{
            this.router.navigate(['/login'])
          },
          error: ()=>{
            this.errors="Failed to sign up"
          }
        })
      
    }
  }
}

