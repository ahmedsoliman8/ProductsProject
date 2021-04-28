import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {
  msg = "";
  products: Array<any> = [];

  constructor(private ps: ProductsService) {
    this.ps.allProducts().then(result => {
      this.products = result
    }).catch(error => {
      this.msg = "Error When Loading Products \n" + error['message']
    });
  }

  ngOnInit(): void {
  }

}
