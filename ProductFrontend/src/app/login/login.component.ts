import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  msg = new FormControl("");

  constructor(private fb: FormBuilder, private us: UsersService, private route: Router) {
    if (localStorage.getItem("token") == null) {
      this.createForm();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.route.navigate(["/"]);
      window.location.replace("/");
    }

  }


  login(username, password) {
    this.us.login(username, password)
      .then(resp => {
        if (resp['success']) {
          localStorage.setItem("token", resp["token"]);
          localStorage.setItem("username", username);
          //this.msg.setValue("Login Successfully");
          if (username == "administrator") {
            this.route.navigate(['/admin']);
            window.location.replace("/admin");
          } else {
            this.route.navigate(['/']);
            window.location.replace("/");
          }

        } else {
          this.msg.setValue(resp["msg"]);
        }
      }).catch(err => {
        this.msg.setValue("Error:" + err.message);
      });
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        //Validators.pattern("/^([a-zA-Z0-9\.-]+)@([a-zA-Z\.-]+)\.([a-z]{2,6})$/")
        Validators.pattern(/\w{5,14}/)
      ])]
    });
  }

  ngOnInit(): void {
  }

}
