import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  listResults: any;
  carrito: any;
  isLoged: boolean;
  user: string;

  constructor(private results: ProductosService,
              private router: Router) {
  }

  ngOnInit() {
    this.carrito = this.results.getCarrito()
    this.results.onCarritoChange.subscribe((carrito: any[]) => {
        this.carrito = carrito;
      }
    )
    if(localStorage.getItem('user')){
      this.isLoged = true;
      this.user = JSON.parse(localStorage.getItem('user')).nombre;
    }else{
      this.isLoged = false;
    }
  }

  getResults(texto: String) {
    return this.results.getProductsSearched(texto).subscribe(response => {
      this.listResults = response;
    })
  }

  getCantidad() {
    if (!this.carrito.length) {
      return 0
    }
    return this.carrito.map((producto: any) => {
      return producto.cantidad
    }).reduce((a: any, b: any) => a + b)
  }

  getPrecio() {
    if (!this.carrito.length) {
      return 0
    }

    return this.carrito.map((producto: any) => {
      return (producto.precio * producto.cantidad)
    }).reduce((a: any, b: any) => a + b)
  }

  borrarProducto(producto: any){
    const arrayResultado = this.carrito.filter((e:any) =>{
      return e._id !== producto._id;
    })
    this.carrito = arrayResultado;
    localStorage.setItem("carrito",JSON.stringify(arrayResultado));
  }

  submitSearch(searchForm:any) {
    this.router.navigate([`/results`], { queryParams: { texto: searchForm.value.searchBar } })
  }

  logOut() {
    localStorage.setItem('carrito' , JSON.stringify([]));
    localStorage.removeItem('user' );
    this.carrito = []
    this.isLoged = false;
    this.user = '';
  }
}
