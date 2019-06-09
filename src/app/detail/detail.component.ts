import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductosService} from "../../services/productos.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  idProduct: any;
  descriptionProduct: any;

  constructor(private router: ActivatedRoute,
              private http: ProductosService) {
  }

  ngOnInit() {
    this.takeProduct()
  }

  takeProduct() {
    this.idProduct = this.router.snapshot.queryParamMap.get('id')
    this.http.getDetails(this.idProduct).subscribe(response => {
      this.descriptionProduct = response
    })
  }

  alCarrito(product: any) {
    this.http.setCarrito(product);
  }

}
