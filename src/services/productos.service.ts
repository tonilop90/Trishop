import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url = 'http://localhost:5000/products';
  carrito: any[] = []
  @Output() onCarritoChange = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get(this.url);
  }

  getProductsSearched(texto: String) {
    return this.http.get(`${this.url}/search?texto=${texto}`);
  }

  getCategoryProducts(esCategoria: any) {
    return this.http.get(`${this.url}/categories?categoria=${esCategoria}`)
  }

  getCarrito(): any[] {
    const carrito = localStorage.getItem("carrito");
    if (!carrito) {
      localStorage.setItem("carrito", JSON.stringify([]));
      return [];
    }
    return JSON.parse(localStorage.getItem("carrito"));
  }

  setCarrito(product: any) {
    let carritoActual: any = localStorage.getItem("carrito");
    let buscaEnCarrito = JSON.parse(carritoActual)

    if(!carritoActual){
      buscaEnCarrito = []
    }
    let index = buscaEnCarrito.find((obj: any) => product._id == obj._id);
    if (!index) {
      product.cantidad = 1
      buscaEnCarrito = [...buscaEnCarrito, ...product]
    }else{
      index.cantidad += 1;
    }
    localStorage.setItem("carrito", JSON.stringify(buscaEnCarrito))

    this.carrito = buscaEnCarrito;
    this.onCarritoChange.emit(buscaEnCarrito);
  }

  getDetails(idProduct: any) {
    return this.http.get(`http://localhost:5000/product?id=${idProduct}`)
  }
}
