import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

/*public username="";
public password="";
public error_message="";
  constructor(private route:Router) { }

  ngOnInit() {
  }

  onClick()
  {
    if(this.username!="admin"&&this.password!="admin")
    {
       this.error_message="invalid username and password";
    }
    else if(this.username!="admin")
    {
       this.error_message="invalid username";
    }
    else if(this.password!="admin")
    {
       this.error_message="invalid password";
    }
    else
    {
       this.route.navigate(['/dashboard']);
    }
  }*/

    authForm: FormGroup;
    isSubmitted  =  false;
    showInvalidLoginError = false;

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

    ngOnInit() {
      this.authService.logout();

      this.authForm  =  this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    get formControls() { return this.authForm.controls; }

    signIn(){
      this.isSubmitted = true;
      if(this.authForm.invalid){
        return;
      }

      if(!this.authService.signIn(this.authForm.value)) {
        this.showInvalidLoginError = true;
        return;
      }

      this.router.navigateByUrl('/dashboard');
    }
}
