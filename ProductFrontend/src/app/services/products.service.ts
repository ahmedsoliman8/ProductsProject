import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterResponse } from './register.response ';
import Products from '../models/Products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api = "http://localhost:3007/products/";

  constructor(private http: HttpClient) { }

  allProducts() {

    let headersVal = new HttpHeaders()
      .set("x-auth-token", localStorage.getItem("token")!);

    return this.http.get<Products[]>(this.api + "product", { headers: headersVal }).toPromise();
  }
}
