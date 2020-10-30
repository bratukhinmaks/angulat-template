import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.sass']
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  productAdded = false;
  imgFile: any;

  constructor(private productSer: ProductService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      imgUrl: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    } else {
      const product = {
        title: this.form.value.title,
        cost: this.form.value.cost,
        description: this.form.value.description,
        imgUrl: this.form.value.imgs,
        category: this.form.value.category,
        weight: this.form.value.weight,
        date: new Date(),
        isDeleted: false,
      };
      const formData: FormData = new FormData();
      formData.append('image', this.imgFile);
      formData.append('data', JSON.stringify(product));
      this.productSer.create(formData).subscribe(
        res => {
          console.log(res);
          this.form.reset();
          this.productAdded = true;
        }
      );
      this.alertService.success('Dodany nowy product');
    }
  }

  change(event: Event) {
    // @ts-ignore
    this.imgFile = event.target.files[0];
  }
}
