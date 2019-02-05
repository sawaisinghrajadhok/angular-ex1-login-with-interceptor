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
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent} from '../app/pages/shopkeeper-dashboard/product-add/add-product.component';
import { PageNotFoundComponent } from '../app/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { FlxUiDatatableModule, FlxUiDataTable } from 'flx-ui-datatable';
import { TestComponent } from './pages/test/test.component';
import { ProductsEditComponent } from './pages/shopkeeper-dashboard/products-edit/products-edit.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes : Route[] = [
  {path: '', component: HomeComponent, pathMatch: 'full', },
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'shopkeeper', component: ShopkeeperDashboardComponent,
    children: [
      {path: 'products', component: ProductsListComponent},
      {path: 'orders', component: OrdersListComponent}
    ]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'test', component: TestComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', redirectTo: '/not-found'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopkeeperDashboardComponent,
    ProductsListComponent,
    OrdersListComponent,
    AddProductComponent,
    PageNotFoundComponent,
    HomeComponent,
    TestComponent,
    ProductsEditComponent,
    RegistrationComponent
  ],
  imports: [
    FlxUiDatatableModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [
    FlxUiDataTable,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
