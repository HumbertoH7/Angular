import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private loginService: LoginService, private elementRef: ElementRef, private formBuilder: FormBuilder, private router: Router) {

  }
  title = 'app';
  alert: String = '';
  loginForm: FormGroup;
  returnUrl: String = "/catalog";

  submitted = false;
  public ngOnInit() {
    $('.burguer').click(function () {
      $(this).toggleClass('is-active');
      $('.navBar').toggleClass('is-active');
      if ($(this).hasClass('is-active')) {
        $('.navMobile').animate({ top: '1.35rem' });
      } else {
        $('.navMobile').animate({ top: '-15rem' });
      }
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E5EBED';
  }
  public toggleLogin() {
    var login = document.getElementById("login-popup");
    login.classList.toggle("active--login");
  }

  get f() { return this.loginForm.controls; }

  public onSubmit() {
    this.submitted = true;
    var span = document.getElementById("error-alert");
    span.classList.remove("active");

    if (!this.f.username.valid) {
      console.log("Campo 'Username' é obrigatório")
      this.alert = "Campo 'Username' é obrigatório"
      span.classList.add("active");
      return;
    }
    if (!this.f.password.valid) {
      console.log("Campo 'Password' é obrigatório")
      this.alert = "Campo 'Password' é obrigatório"
      span.classList.add("active");
      return;
    }
    let loginData = { "user": this.f.username.value, "password": this.f.password.value }
    let trusted: any;
    this.loginService.sendPostRequest(loginData, "login")
      .subscribe(
          data => {
              console.log(data);
              this.router.navigateByUrl("catalog");
              var login = document.getElementById("login-popup");
              login.classList.toggle("active--login");
          },
          error => {
            console.log(error);
            var login = document.getElementById("login-popup");
            login.classList.toggle("active--login");
            this.router.navigateByUrl('login')
          }
      )
  }
}
