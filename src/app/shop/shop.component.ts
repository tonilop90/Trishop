import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any = [];

  constructor(private getProducts: ProductosService,
              private router : Router) {
  }

  ngOnInit() {
    return this.getProducts.getProducts().subscribe(response => {
      this.products = response;
    })
  }

  alCarrito(product: any) {
    this.getProducts.setCarrito(product);
  }

  goToDetails(product: any) {
    this.router.navigate([`/product`], { queryParams: { id: product._id} })
  }
}
