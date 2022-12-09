import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public searchForm = this.formBuilder.group({
    searchfriends: new FormControl(null, [Validators.required]),
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void { }

  public submit() {
    console.warn('New friends have been found', this.searchForm.value.searchfriends);
    this.router.navigate(['./search'], { 
      relativeTo: this.route, queryParams: { search: this.searchForm.value.searchfriends } 
    })
  }

}
