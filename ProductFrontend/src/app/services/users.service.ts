import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterResponse } from './register.response ';
import Users from '../models/Users.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api = "http://localhost:3007/users/";
  constructor(private http: HttpClient) { }
  addUser(username: String, name: String, email: String, password: String, phone: String, gender: String) {


    const user = {
      username: username,
      name: name,
      phone: phone,
      email: email,
      gender: gender,
      password: password
    };
    return this.http.post(this.api + "user", user, {}).toPromise();
    /*
    this.http.post(api + "user", user, {}).subscribe(resp => {
      if (resp["success"] == true) {
        localStorage.setItem("token", resp["token"]);
      } else {
        console.log(resp);
      }
    }, err => {
      console.log(`Error Name: ${err.name}`);
      console.log(`Error Message: ${err.message}`);
      console.log(err);
    });*/
  }

  login(username, password) {
    let headersVal = new HttpHeaders()
      .set("username", username)
      .set("password", password);
    return this.http.get(this.api + "login", { headers: headersVal }).toPromise();
  }

  allUsers() {

    let headersVal = new HttpHeaders()
      .set("x-auth-token", localStorage.getItem("token")!);

    return this.http.get<Users[]>(this.api + "user", { headers: headersVal }).toPromise();
  }

}
