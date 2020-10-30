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
  private imgFile: any;

  constructor(private route: ActivatedRoute, private productSer: ProductService, private router: Router, private alertServ: AlertService) {
  }

  ngOnInit() {

    this.route.params.pipe(
      switchMap(
        params => {
          return this.productSer.getById(params['id']);
        }
      )
    ).subscribe(product => {
      this.product = product;
      console.log(product);
      this.form = new FormGroup({
        title: new FormControl(this.product.title, Validators.required),
        cost: new FormControl(this.product.cost, Validators.required),
        description: new FormControl(this.product.description, Validators.required),
        imgUrl: new FormControl(this.product.imgUrl, Validators.required),
        category: new FormControl(this.product.category, Validators.required),
        weight: new FormControl(this.product.weight, Validators.required),
      });
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    } else {
      const product = {
        ...this.product,
        title: this.form.value.title,
        cost: this.form.value.cost,
        description: this.form.value.description,
        imgUrl: this.form.value.imgUrl,
        category: this.form.value.category,
        weight: this.form.value.weight,
        date: new Date(),
      };
      const formData: FormData = new FormData();
      if (this.imgFile !== null && this.imgFile !== undefined && this.imgFile !== '' ){
        formData.append('image', this.imgFile);
      }
      formData.append('data', JSON.stringify(product));
      this.productSer.updateItem(formData, product._id).subscribe(
        res => {
          this.productChanged = true ;
          this.router.navigate(['/admin', 'dashboard']);
        }
      );
      this.alertServ.success('Produkt został zmieniony')
    }
  }
  change(event: Event) {

    // @ts-ignore
    this.imgFile = event.target.files[0];
  }

}
