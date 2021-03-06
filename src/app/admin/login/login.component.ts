import { Component, OnInit, OnDestroy } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Subscriber, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub: Subscription;
  submited = false;
  erroreMessage = false;
  constructor(private servise: AuthService, private router: Router, private alertServ: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      restaurantId: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    } else {
      this.submited = true;

      const user = {
        email: this.form.value.email,
        password: this.form.value.password,
        restaurantId: this.form.value.restaurantId
      };
      this.sub = this.servise.login(user).subscribe(
        res => {
          this.form.reset();
          this.router.navigate(['/admin', 'dashboard']);
          this.submited = false;
          this.erroreMessage = false;
        },
        error => {
          this.submited = false;
          console.log(error.error.code);
          this.erroreMessage = true;
          this.alertServ.danger('Sprobuj ponownie')
        }
      );
    }
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
