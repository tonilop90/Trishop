import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ProductosService} from "../../services/productos.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  esCategoria :any;
  esBusqueda:any;
    listaProductos:any;
  constructor(private route : ActivatedRoute,
              private http: ProductosService,
              private router: Router) {
    this.router.events.subscribe((ev)=>{
      if(ev instanceof NavigationEnd){
        this.takeResults();
      }
    })
  }


  ngOnInit() {

    this.takeResults();
  }

   private getResultsBusqueda(texto:any){
    this.http.getProductsSearched(texto).subscribe(result=>
      this.listaProductos= result
    )
  }

  private getResultsCategoria(esCategoria: any) {
    this.http.getCategoryProducts(esCategoria).subscribe(response =>{
      this.listaProductos = response
    })
  }

  takeResults() {
    this.esBusqueda = this.route.snapshot.queryParamMap.get('texto')
    this.esCategoria = this.route.snapshot.queryParamMap.get('categoria')

    if(this.esBusqueda !== null){
      this.getResultsBusqueda(this.esBusqueda);
    }else{
      this.getResultsCategoria(this.esCategoria);
    }
     this.listaProductos = this.http.getProducts();
  }

  alCarrito(producto: any) {
    this.http.setCarrito(producto);
  }

  goToDetails(producto: any) {
    this.router.navigate([`/product`], { queryParams: { id: producto._id} })
  }
}
