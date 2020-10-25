import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {concatMap, switchMap} from 'rxjs/operators';
import {ProductService} from '../../shared/services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/models';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  product: Product;
  productChanged = false;
  editDescription = false;
  editImg = false;

  constructor(private route: ActivatedRoute, private productSer: ProductService, private router: Router, private alertServ: AlertService) {
  }

  ngOnInit() {

    this.route.params.pipe(
      concatMap(
        params => {
          return this.productSer.getById(params['id']);
        }
      )
    ).subscribe(product => {
      this.product = product;
      this.form = new FormGroup({
        title: new FormControl(this.product.title, Validators.required),
        cost: new FormControl(this.product.cost, Validators.required),
        description: new FormControl('', Validators.required),
        imgUrl: new FormControl('', Validators.required),
        category: new FormControl(this.product.category, Validators.required),
        weight: new FormControl(this.product.weight, Validators.required),
      });
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    } else {
      this.productSer.updateItem(
        {
          ...this.product,
          title: this.form.value.title,
          cost: this.form.value.cost,
          description: this.form.value.description,
          imgUrl: this.form.value.imgUrl,
          category: this.form.value.category,
          weight: this.form.value.weight,
          date: new Date(),
        }
      ).subscribe(
        res => {
          console.log(this.form.value);
          this.productChanged = true ;
          this.router.navigate(['/admin', 'dashboard']);
        }
      );
      this.alertServ.success("Produkt został zmieniony")
    }
  }

}
