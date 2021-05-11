import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/main/products/products.component';
import { OrdersComponent } from './components/main/orders/orders.component';
import { CreateOrderComponent } from './components/main/orders/create-order/create-order.component';
import { SalesComponent } from './components/main/sales/sales.component';
import { SalesCreateComponent } from './components/main/sales/sales-create/sales-create.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'sales/create', component: SalesCreateComponent },
    { path: 'sales/create/:key', component: SalesCreateComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'orders/create', component: CreateOrderComponent },
    { path: 'orders/create/:key', component: CreateOrderComponent },
    { path: 'products', component: ProductsComponent }
  ] },
  { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
