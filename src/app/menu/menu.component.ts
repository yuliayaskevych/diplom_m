import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  uid: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
  }

}
