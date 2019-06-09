import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router) {
  }

  isSubmit: boolean = false;
  registroForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })

  ngOnInit() {
  }

  onSubmit(registroForm: any) {
    this.isSubmit = true;
    if (registroForm.invalid) return;
    return this.userService.signUser(registroForm.value, (response: any): void => {
      this.router.navigate(['/shop']);
    });
  }

}
