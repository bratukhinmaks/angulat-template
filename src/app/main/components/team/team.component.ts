import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements OnInit {
  team = [
    {name: 'Jon', img: '../../../assets/team/team-1.jpg', description: 'Meat'},
    {name: 'Sam', img: '../../../assets/team/team-2.jpg', description: ' Fish'},
    {name: 'Jane', img: '../../../assets/team/team-3.jpg', description: 'Deserts'},
    {name: 'Hof', img: '../../../assets/team/team-4.jpg', description: 'Drinks'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
