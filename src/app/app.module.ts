import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from '@app/core';
import {HomeModule} from './home/home.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ShopComponent} from './shop/shop.component';
import {RouterModule, Routes} from "@angular/router";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DetailComponent} from './detail/detail.component';
import {ResultsComponent} from './results/results.component';
import {ProductosService} from "../services/productos.service";
import {LoginComponent} from './login/login.component';
import {SignComponent} from './sign/sign.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {HistorialPedidosComponent} from './historial-pedidos/historial-pedidos.component';
import {UsersService} from "../services/users.service";

const routes: Routes = [
  // Fallback when no prior route is matched
  {path: 'shop', component: ShopComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot(routes),
    NgbModule,
    CoreModule,
    HomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // must be imported as the last module as it contains the fallback route
  ],
  exports: [RouterModule],
  declarations: [AppComponent, ShopComponent, HeaderComponent, FooterComponent, DetailComponent, ResultsComponent, LoginComponent, SignComponent, CheckoutComponent, HistorialPedidosComponent],
  providers: [ProductosService, UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
