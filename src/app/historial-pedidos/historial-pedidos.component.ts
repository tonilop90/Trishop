import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.scss']
})
export class HistorialPedidosComponent implements OnInit {
  userId: any;
  pedidos: any[]
  fecha: any;

  constructor(private user: UsersService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {

    this.getPedidos();

  }

  private getPedidos() {
    const user = this.user.getUser();
    this.user.getOrders(user._id).subscribe((res: any) => {
      this.pedidos = res.pedidos;
    })
  }
}
