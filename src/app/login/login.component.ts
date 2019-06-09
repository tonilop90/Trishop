import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) {
  }

  userLogin = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit() {
  }

  onSubmitLog(user: any) {
    this.userService.logUser(user.value, (response) => {
      if (response.login) {
        this.router.navigate(['/shop']);
      }
    });
  }
}
