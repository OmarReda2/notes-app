import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isStyleInvalid = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' }
  isStyleValid = { 'background-color': 'gray', 'border-color': 'gray' };
  isClicked: boolean = false;
  resMsg: any;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  constructor(private _AuthService: AuthService) { }



  signUp = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])
  })

  formData() {

    this.isClicked = true

    if (this.signUp.valid) {
      $('#signUp').css('height', this.orgMinHeight)

      this._AuthService.signUp(this.signUp.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.message == 'success') {
            this.isSuccess = true;
            this.isFailed = false;
            this.isClicked = false
            this.resMsg = res.message


            // this.signUp.reset()
          }

          else {
            this.isClicked = false;
            this.isFailed = true;
            this.isSuccess = false;
            this.resMsg = res.errors.email.message

          }
        }


      })
    }
  }


  top: any;
  Orgtop: any;
  passAlertTop: any;
  emailAlertTop: any;
  ageAlertTop: any;
  lnameAlertTop: any;
  fnameAlertTop: any;
  orgMinHeight: any;
  minHeight: any;
  containerHeight: any;


  pxToNum(alert:any){
    return Number($(alert).css('height')?.replace('px', '')) ? Number($(alert).css('height').replace('px', '')):0
   }

  heightMod() {
    Number($('.form').css('height').replace('px', ''))

    this.top = this.Orgtop
    this.passAlertTop = this.pxToNum('.pass-alert')
    this.emailAlertTop = this.pxToNum('.email-alert')
    this.ageAlertTop = this.pxToNum('.age-alert')
    this.fnameAlertTop = this.pxToNum('.fname-alert')
    this.lnameAlertTop = this.pxToNum('.lname-alert')

    let y = this.top + (this.passAlertTop / 2) + (this.emailAlertTop / 2) + (this.ageAlertTop / 2) + (this.lnameAlertTop / 2) + (this.fnameAlertTop / 2)

    $('.form').css('top', y);

    this.minHeight = this.orgMinHeight

    $('#signUp').css('height', this.minHeight + y);

    


  }

 




  ngOnInit(): void {
    $('#signUp').particleground();

    this.containerHeight = Number($('.container').css('height')?.replace('px', ''))
    this.orgMinHeight = Number($('#signUp').css('height')?.replace('px', '')) - this.containerHeight
    this.Orgtop = Number($('.form').css('top').replace('px', ''))
    console.log(this.Orgtop);

  }

}
