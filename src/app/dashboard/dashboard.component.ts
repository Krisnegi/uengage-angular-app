import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { products } from '../../data/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  public totalProducts = 0;
  public activeProducts = 0;
  public inactiveProducts = 0;

  public productList = [];
  public username = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
     this.productList=products;
     this.username = localStorage.getItem('USERNAME');
     this.getProductsCount();
  }

  addProduct(newProductname,newMrp,newSp,newBrand)
  {
    const newProduct={productName:newProductname,mrp:newMrp,sp:newSp,brand:newBrand,isActive:true};
    this.productList.push(newProduct);
    this.getProductsCount();
  }

  enableProduct(product)
  {
    product.isActive=true;
    this.getProductsCount();
  }

  disableProduct(product)
  {
    product.isActive=false;
    this.getProductsCount();
  }

  getProductsCount()
  {
    const products=this.productList;
    let active=0;
    let inactive=0;

    for(let i=0;i<products.length;i++)
    {
      if(products[i].isActive == true)
        active++;
      else
        inactive++;
    }
    this.totalProducts=products.length;
    this.activeProducts=active;
    this.inactiveProducts=inactive;
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
