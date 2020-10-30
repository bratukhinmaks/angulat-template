import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'shop-template';
  isLoaded = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = !this.isLoaded;
    }, 3000);
  }

}
