import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Game } from '../models';
import { Task } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public games: Game[];
  public tasks: Task[];
  private url:string = "https://vyaskevych.github.io/learnJS/";
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.root.children[0].params.uid;
    this.userService.readTasksFromLibrary(uid).subscribe(r => this.tasks = r);
  }

  public download(name: string) {
    alert(`Wait a minute, the game ${name} is installed on your computer`)
  }

  public openTask(id: string) {
    window.open(this.url+id, "_blank");
  }

  public share(name: string) {
    alert(`You shared the game ${name}`)
  }
}
