import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


declare var $: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) {
    if(this._AuthService.isLoggedIn()){
      this._Router.navigate(['/profile'])
    }
   }
  isStyleInvalid = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' }
  isStyleValid = { 'background-color': 'gray', 'border-color': 'gray' };
  isSigned:boolean = false;
  isUser:boolean = false

  signIn = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    // password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])
    password: new FormControl('', [Validators.required])
  })

  formData() {
    this.isSigned = true
    if (this.signIn.valid) {

      this._AuthService.signIn(this.signIn.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.isSigned = false
            localStorage.setItem('token', res.token);
            this._Router.navigate(['/profile'])
          }else{
            this.isSigned = false
            this.isUser = true
          }
        }
      })



    }
  }



  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
