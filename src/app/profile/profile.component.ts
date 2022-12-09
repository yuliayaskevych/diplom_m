import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models';

import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  private uid: any;
  user: User;
  username: any;
  email: any;
  age: any;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.root.children[0].params.uid;

    this.userService.readUser(this.uid)
      .subscribe((res: User) => this.user = { ...res })

    this.profileForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      age: new FormControl('', [Validators.required]),
    })    
  }
  
  public submit() {
    console.warn('Your profile has been modified', this.profileForm.value);
    const { username, age } = this.profileForm.value;
    this.userService.update(`users/${this.uid}`, { username, age })
  }
}
