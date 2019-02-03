import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    usertype: ['CUSTOMER', [Validators.required]]
  });

  loginSubmit() {
    this.LoginService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.usertype)
    .subscribe(result=> {
      localStorage.setItem(AppConstants.JWT_TOKEN_STORAGE_NAME, result.body.token);
      if (this.loginForm.value.usertype == 'SHOPKEEPER') {
        this.router.navigate(['/shopkeeper']);
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
