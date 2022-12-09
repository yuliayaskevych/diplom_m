import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css']
})
export class FriendsSearchComponent implements OnInit {
  findUsers: string[] = [];
  users: string[] = [];
  search: string;
  friends: string[] = [];

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const uid = this.route.snapshot.root.children[0].params.uid;
    this.route.queryParams.subscribe(queryParam => {
      this.search = queryParam.search;
      this.userService.searchUser(uid, this.search).subscribe(r => this.findUsers = r)
    })
  }

  addFriend(username: string) {
    const uid = this.route.snapshot.root.children[0].params.uid;
    this.userService.push(`users/${uid}/friends`, username);
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
