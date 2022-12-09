import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { users } from '../users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'steamClone';
  public loginForm = this.formBuilder.group({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  public usersList = users; 

  private uid: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  public ngOnInit(): void { }

  public submit() {
    const { email, password } = this.loginForm.value

    this.userService.login(email, password)
      .then((res) => { console.log('succes', res); this.uid = res.user?.uid })
      .then(() => { this.router.navigate(['/menu', this.uid, 'games']) })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      })
    this.loginForm.reset();
  }

}
