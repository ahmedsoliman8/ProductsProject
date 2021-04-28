import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {
  msg = "";
  users: Array<any> = [];
  constructor(private us: UsersService) {
    this.us.allUsers().then(result => {
      this.users = result
    }).catch(error => {
      this.msg = "Error When Loading Users \n" + error['message']
    });
  }

  ngOnInit(): void {
  }

}
