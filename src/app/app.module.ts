import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/main/home/home.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort'
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsComponent } from './components/main/products/products.component';
import { ProductsListComponent } from './components/main/products/products-list/products-list.component';
import { OptionsComponent } from './components/main/products/options/options.component';
import { OrdersComponent } from './components/main/orders/orders.component';
import { OrdersTableComponent } from './components/main/orders/orders-table/orders-table.component';
import { OptionsOrdersComponent } from './components/main/orders/options-orders/options-orders.component';
import { CreateOrderComponent } from './components/main/orders/create-order/create-order.component';
import { SalesComponent } from './components/main/sales/sales.component';
import { SalesListComponent } from './components/main/sales/sales-list/sales-list.component';
import { SalesOptionsComponent } from './components/main/sales/sales-options/sales-options.component';
import { SalesCreateComponent } from './components/main/sales/sales-create/sales-create.component';

import { CookieService } from 'ngx-cookie-service';
import { HomeTableComponent } from './components/main/home/home-table/home-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    ProductsComponent,
    ProductsListComponent,
    OptionsComponent,
    OrdersComponent,
    OrdersTableComponent,
    OptionsOrdersComponent,
    CreateOrderComponent,
    SalesComponent,
    SalesListComponent,
    SalesOptionsComponent,
    SalesCreateComponent,
    HomeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgbCollapseModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
