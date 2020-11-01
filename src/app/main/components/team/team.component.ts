import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements OnInit {
  team = [
    {name: 'Mark Angelila', img: '../../../assets/team/team-1.jpg', description: 'Cras senunc massa quisque tempor dolor sit amet'},
    {name: 'Mark Angelila', img: '../../../assets/team/team-2.jpg', description: ' Cras senunc massa quisque tempor dolor sit amet'},
    {name: 'Mark Angelila', img: '../../../assets/team/team-3.jpg', description: 'Cras senunc massa quisque tempor dolor sit amet'},
    {name: 'Mark Angelila', img: '../../../assets/team/team-4.jpg', description: 'Cras senunc massa quisque tempor dolor sit amet'},
    {name: 'Mark Angelila', img: '../../../assets/team/team-5.jpg', description: 'Cras senunc massa quisque tempor dolor sit amet'},
  ];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    margin: 15,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      },
      1200: {
        items: 5
      }
    },
    nav: false
  };

  constructor() {
  }

  ngOnInit() {
  }

}
