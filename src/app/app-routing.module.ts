import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {ShopComponent} from "@app/shop/shop.component";
import {DetailComponent} from "@app/detail/detail.component";
import {ResultsComponent} from "@app/results/results.component";
import {LoginComponent} from "@app/login/login.component";
import {SignComponent} from "@app/sign/sign.component";
import {CheckoutComponent} from "@app/checkout/checkout.component";
import {HistorialPedidosComponent} from "@app/historial-pedidos/historial-pedidos.component";

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: 'shop', component: ShopComponent },
  { path: 'product', component: DetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'results', component: ResultsComponent},
  { path: 'sign', component: SignComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'pedidos', component: HistorialPedidosComponent},
  { path: '**', redirectTo: 'shop'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
