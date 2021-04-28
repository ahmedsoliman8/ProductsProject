import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { GetUsersComponent } from './admin/get-users/get-users.component';
import { GetProductsComponent } from './admin/get-products/get-products.component';


const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent

  },
  {
    path: 'admin/listusers',
    component: GetUsersComponent

  },
  
  {
    path: 'admin/listproducts',
    component: GetProductsComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
