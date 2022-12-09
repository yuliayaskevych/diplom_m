import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';



@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  private uid: any;
  friends: { username: string; id: string; }[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.root.children[0].params.uid;
    this.userService.readFriends(this.uid).subscribe(res => {
      this.friends = res; console.log('friends form list', this.friends);
    });
  }

  removeFriend(id: string) {
    this.userService.delete(`users/${this.uid}/friends/${id}`)
  }  
}
