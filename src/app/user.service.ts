import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, mergeMap, tap, } from 'rxjs/operators';
import { User, Users, Game, Games, Task, Tasks } from './models';
import { learningMap } from './learningMap';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,

  ) { }

  public login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(res => resolve(res), err => reject(err));
    })
  }

  private read(path: string) {
    return this.db.object(path).valueChanges();
  }

  private readGames(path: string) {
    return this.read(path).pipe(
      map((res) => res as Games),
      map((res) => Object.values(res))
    )
  }

  public readAllGames() {
    return this.readGames('games')
  }

  private readTasks(path: string) {
    return this.read(path).pipe(
      map((res) => res as Tasks),
      map((res) => Object.values(res))
    )
  }

  public readAllTasks() {
    return this.readTasks('tasks')
  }

  public readGamesFromLibrary(uid: string) {
    return this.readGames(`users/${uid}/games`);
  }

  public readTasksFromLibrary(uid: string) {
    return this.readTasks(`users/${uid}/tasks`);
  }

  public readUser(uid: string) {
    return this.read(`users/${uid}`).pipe(map((r) => r as User))
  }

  public readFriends(uid: string) {
    return this.read(`users/${uid}/friends`)
      .pipe(
        map((res) => {
          const data = res as { [key: string]: string };
          if (data) {
            return Object.keys(data).map((key: string) => ({ username: data[key], id: key }))
          }
          return data;
        })
      )
  }

  public update(path: string, data: {}) {
    this.db.database.ref(path).update(data)
      .then(() => { alert('update successful') })
      .catch(err => { alert(err.message); })
  }

  public delete(path: string) {
    return this.db.object(path)
      // return this.db.database.ref(path)
      .remove()
      .then(() => alert('delete successful'))
      .catch((err) => alert(err.message))
  }

  public push(path: string, data: any) {
    this.db.database.ref(path).push(data)
      .then(() => alert("add data"))
      .catch(err => alert(err.message));
  }

  public searchUser(uid: string, search: string) {
    let friendExist: string[] = [];
    return this.read('users').pipe(
      map((r) => r as Users),
      tap((r: Users) => {
        friendExist.push(r[uid].username);
        if (r[uid].friends) {
          friendExist = [...Object.values(r[uid].friends), r[uid].username]
        }
      }),
      map(users => Object.values(users)
        .map(user => user.username)
        .filter(user => user.includes(search))
        .filter(user => !friendExist.includes(user))
      ),
    )
  }

  public addGameInLibrary(uid: string, game: Game) {
    this.db.object(`users/${uid}/games/${game.name}`)
      .set(game)
      .then(() => alert(`add ${game.name} game`))
      .catch(err => alert(err.message));
  }

  public addTaskInLibrary(uid: string, task: Task) {
    this.db.object(`users/${uid}/tasks/${task.id}`)
      .set(task)
      .then(() => alert(`add ${task.title} task`))
      .catch(err => alert(err.message));
  }

  //recommended
  // private read(path: string) {
  //   return this.db.object(path).valueChanges();
  // }

  // private readTasks(path: string) {
  //   return this.read(path).pipe(
  //     map((res) => res as Tasks),
  //     map((res) => Object.values(res))
  //   )
  // }
  //https://diplom-220ec-default-rtdb.firebaseio.com/tasks/lab_1_0

  public readRecommendedTasks(uid: string) {
    let tasks: string[];
    return this.read(`users/${uid}/recommended`)
      .pipe(
        map(recommended => recommended as []),
        tap(recommended => {
          console.log('qqq', Object.values(recommended))
          tasks = [...Object.values(recommended)]
        }),
      )
      .pipe(mergeMap(() => {
        return this.read('tasks').pipe(
          map(res => res as Tasks),
          map(res => tasks.map(task => res[task]))
        )
      }))
  }

  private findIndexTask(matrix: string[][], search: string) {
    const row = matrix.findIndex(row => row.includes(search));
    const col = matrix[row].indexOf(search);
    return { row, col };
  }
  public isNextTask(id: string): boolean {
    const { row, col } = this.findIndexTask(learningMap, id);
    if (row === learningMap.length - 1 && col === learningMap[row].length - 1) return false;
    return true;
  }
  public isNextLevel(id: string): boolean {
    const { row, col } = this.findIndexTask(learningMap, id);
    if (row === learningMap.length - 1) return false;
    return true;
  }

  public nextTask(id: string) {
    const { row, col } = this.findIndexTask(learningMap, id);
    if (col < learningMap[0].length - 1) {
      return learningMap[row][col + 1]
    } else {
      return learningMap[row + 1][0]
    }
  }

  public nextLevelTask(id: string) {
    const { row } = this.findIndexTask(learningMap, id);
    return learningMap[row + 1][0]
  }

  public addTaskInRecommended(uid: string, id: string) {
    this.db.object(`users/${uid}/recommended/${id}`)
      .set(id)
      .then(() => alert(`new task ${id} recommended`))
      .catch(err => alert(err.message));
  }


}
