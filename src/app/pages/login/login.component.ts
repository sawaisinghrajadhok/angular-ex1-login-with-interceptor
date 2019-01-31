import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../../providers/login.service';
import { Router } from '@angular/router';
import { AppConstants } from '../../constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  
  }
  loginForm = this.fb.group({
    username: [''],
    password: [''],
    usertype: ['']
  });

  loginSubmit() {
    console.log('login submit called');
    console.log('username ' + this.loginForm.value.username);
    console.log('password' +  this.loginForm.value.password);
    console.log('usertype' + this.loginForm.value.usertype);
    this.LoginService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.usertype)
    .subscribe(result=> {
      localStorage.setItem(AppConstants.JWT_TOKEN_STORAGE_NAME, result.body.token);
      if (this.loginForm.value.usertype == 'SHOPKEEPER') {
        this.router.navigate(['/shopkeeper-dashboard']);
      }
    },
    error=> {
      console.log('login request error ' + error);
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get usertype() {
    return this.loginForm.get('usertype');
  }
}
