import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  carrito: any = [];
  first: any;
  last: any;
  email: any;
  address: any;
  city: any;
  tel: any;
  private pedido: any;

  constructor(private results: ProductosService,
              private user: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.carrito = this.results.getCarrito()
    this.results.onCarritoChange.subscribe((carrito: any[]) => {
        this.carrito = carrito;
      }
    )
  }

  getPrecio() {
    if (!this.carrito.length) {
      return 0
    }

    return this.carrito.map((producto: any) => {
      return (producto.precio * producto.cantidad)
    }).reduce((a: any, b: any) => a + b)
  }

  onSubmit() {
    event.preventDefault();
    this.pedido = {
      nombre: this.first,
      apellidos: this.last, "email": this.email,
      direccion: this.address,
      ciudad: this.city,
      telefono: this.tel,
      productos: this.carrito,
      _id: this.user.getUser() ? this.user.getUser()._id : null
    }
    this.user.addOrder(this.pedido, (response) => {
      if (response.success) {
        localStorage.setItem("carrito", JSON.stringify([]));
        this.router.navigate(['/pedidos']);
      }
    });
  }

}
