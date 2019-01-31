import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Route, RouterModule, Router } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { BasicAuthInterceptor } from '../app/_helper/basic-auth.interceptor';
import { ShopkeeperDashboardComponent } from './pages/shopkeeper-dashboard/shopkeeper-dashboard.component';
import { ProductsListComponent } from './pages/shopkeeper-dashboard/products-list/products-list.component';
import { OrdersListComponent } from './pages/shopkeeper-dashboard/orders-list/orders-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalBasic} from '../app/pages/modalsss/modal-basic';

const routes : Route[] = [
  {path: '', component: LoginComponent},
  {path: 'shopkeeper', component: ShopkeeperDashboardComponent,
    children: [
      {path: 'products', component: ProductsListComponent},
      {path: 'orders', component: OrdersListComponent}
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopkeeperDashboardComponent,
    ProductsListComponent,
    OrdersListComponent,
    NgbdModalBasic
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
