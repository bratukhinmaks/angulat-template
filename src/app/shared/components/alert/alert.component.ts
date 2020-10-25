import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit {
  type: string;
  text: string;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.alert$.subscribe(alert => {
        this.text = alert.text;
        this.type = alert.type;

        const timeout = setTimeout(() => {
          clearTimeout(timeout),
            this.text = '';
        }, 5000);
      }
    )
  }
}
