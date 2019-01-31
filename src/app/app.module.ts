import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Route, RouterModule, Router } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { BasicAuthInterceptor } from '../app/_helper/basic-auth.interceptor';
import { ShopkeeperDashboardComponent } from './pages/shopkeeper-dashboard/shopkeeper-dashboard.component';

const routes : Route[] = [
  {path: '', component: LoginComponent},
  {path: 'shopkeeper-dashboard', component: ShopkeeperDashboardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopkeeperDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
