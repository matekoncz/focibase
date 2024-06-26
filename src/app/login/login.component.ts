import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errors=""

  constructor(private authservice: AuthService,private formbuilder: FormBuilder, private router: Router ){

  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      "emailControl": ['',[Validators.required,Validators.email]],
      "passwordControl": ['',Validators.required]
    })
  }

  async loginuser(){
    if(this.form.invalid){
      if(this.form.controls['emailControl'].invalid){
        this.errors="invalid email format"
        return
      }
      if(this.form.controls["passwordControl"].invalid){
        this.errors="password missing"
        return
      }
    } else {
      this.errors="";
        console.log("attempting")
        this.authservice.login(this.form.get("emailControl")?.value,this.form.get("passwordControl")?.value).subscribe({
          next: (usc)=>{
            localStorage.setItem('currentuser','true')
            this.router.navigate([''])
            },
          error: (error)=>{
            this.errors="Failed to log in: "+error
          }
        })
    }
  }
}
