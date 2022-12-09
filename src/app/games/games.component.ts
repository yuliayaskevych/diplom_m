import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../models';
import { Task } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  public gamesForm: FormGroup;
  private allGames: Game[];
  public games: Game[];
  public max = 3
  private rate = 100;
  private allTasks: Task[];
  public tasks: Task[];


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.userService.readAllGames().subscribe(r => {
    //   this.allGames = r;
    //   console.log("qqq", this.allGames)
    //   this.games = [...this.allGames]
    // });
    this.userService.readAllTasks().subscribe(r => {
      this.allTasks = r;
      this.tasks = [...this.allTasks]
    });
  }

  private initForm() {
    this.gamesForm = this.formBuilder.group({
      searchGames: new FormControl('', [Validators.required]),
      operators: new FormControl(true),
      array: new FormControl(true),
      object: new FormControl(true),
      range: new FormControl(this.max),
    })
  }

  public addFilter_1() {
    const price = this.gamesForm.value.range * this.rate;
    this.games = this.allGames.filter(game => this.gamesForm.value[game.genre]);
    if (this.gamesForm.value.range !== this.max) {
      this.games = this.games.filter(game => game.price <= price);
    }
    this.games = this.games.filter(game => game.name.includes(this.gamesForm.value.searchGames))
  }
  public addFilter() {
    const level = this.gamesForm.value.range === 3 ? "easy,medium,hard" : this.gamesForm.value.range === 2 ? "easy,medium" : "easy";
    console.log("qqq",level);
    
    this.tasks = this.allTasks.filter(task => this.gamesForm.value[task.topic]);
    if (this.gamesForm.value.range !== this.max) {
      this.tasks = this.tasks.filter(task => level.includes(task.level));
    }
    this.tasks = this.tasks.filter(task => task.title.toLocaleLowerCase().includes(this.gamesForm.value.searchGames))
  }

  public addGame(name: string) {
    const addGame = this.games.find(game => game.name === name);
    const uid = this.route.snapshot.root.children[0].params.uid;
    if (addGame) {
      this.userService.addGameInLibrary(uid, addGame);
    }
  }

  public addTask(id: string) {
    const addTask = this.tasks.find(game => game.id === id);
    const uid = this.route.snapshot.root.children[0].params.uid;
    if (addTask) {
      this.userService.addTaskInLibrary(uid, addTask);
    }
  }

}
