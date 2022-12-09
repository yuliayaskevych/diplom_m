import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Task } from '../models';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  public tasks: Task[];
  public newId: string = 'lab_1_1';
  public displayInput: boolean = false;
  private url: string = "https://vyaskevych.github.io/learnJS/";
  private uid: string;

  public assessmentForm: FormGroup;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.root.children[0].params.uid;
    this.userService.readRecommendedTasks(this.uid).subscribe(r => this.tasks = r);
    this.assessmentForm = this.formBuilder.group({
      assessment: ['bad']
    })
    this.displayInput = false;
  }

  public openTask(id: string) {
    window.open(this.url + id, "_blank");
    this.displayInput = true

  }

  public nextTask(id: string) {
    if (this.userService.isNextTask(id)) {
      this.newId = this.userService.nextTask(id);
      this.userService.addTaskInRecommended(this.uid, this.newId);
      this.displayInput = false;
    } else {
      alert("all tasks in the topic are completed")
    }
  }

  public nextLevelTask(id: string) {
    if (this.userService.isNextLevel(id)) {
      this.newId = this.userService.nextLevelTask(id);
      this.userService.addTaskInRecommended(this.uid, this.newId);
      this.displayInput = false;

    } else {
      alert("all tasks in the topic are completed")
    }
  }

  public change(id: string) {
    //alert(JSON.stringify(this.assessmentForm.value))
    const assessment = this.assessmentForm.value.assessment;
    if (assessment === "bad") {
      alert("Вчи ще!!");
      return;
    }
    if (assessment === "satisfactory") {
      this.nextTask(id);
      return;
    }
    if (assessment === "good") {
      this.nextLevelTask(id);
    }
  }

}
