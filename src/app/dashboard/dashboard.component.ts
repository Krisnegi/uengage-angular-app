import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { products } from '../../data/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public totalProducts = 0;
  public activeProducts = 0;
  public inactiveProducts = 0;

  public productList = [];
  public username = "";
  addProductForm: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productList = products;
    this.username = localStorage.getItem('USERNAME');
    this.getProductsCount();

    this.addProductForm = this.formBuilder.group({
      productname: ['', Validators.required],
      mrp: ['', Validators.required],
      sp: ['', Validators.required],
      brand: ['', Validators.required]
    });
  }

  get formControls() { return this.addProductForm.controls; }

  addProduct() {
    this.isSubmitted = true;

    if (this.addProductForm.invalid) {
       return;
    }

    const formValues = this.addProductForm.value;

    const newProduct = {
      productName: formValues.productname,
      mrp: formValues.mrp,
      sp: formValues.sp,
      brand: formValues.brand,
      isActive: true // by default
    };

    this.productList.push(newProduct);
    this.getProductsCount();
  }

  enableProduct(product) {
    product.isActive = true;
    this.getProductsCount();
  }

  disableProduct(product) {
    product.isActive = false;
    this.getProductsCount();
  }

  getProductsCount() {
    const products = this.productList;
    let active = 0;
    let inactive = 0;

    for (let i = 0; i < products.length; i++) {
      if (products[i].isActive == true)
        active++;
      else
        inactive++;
    }
    this.totalProducts = products.length;
    this.activeProducts = active;
    this.inactiveProducts = inactive;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
