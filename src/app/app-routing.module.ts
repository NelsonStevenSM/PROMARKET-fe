import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guard/role.guard';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
      },
      {
        path: 'authentication', loadChildren: './pages/authentication/authentication.module#AuthenticationModule',
        canActivate: [RoleGuard]
      },
    ]
  }, {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home', loadChildren: './pages/home/home.module#HomeModule',
        canActivate: [RoleGuard]
      } ,
      //PLANOS
      {
        path: 'proyecto1', loadChildren: './pages/planos/proyecto1/proyecto1.module#Proyecto1Module'
      }
      ,
      //USUARIOS
      {
        path: 'usuario', loadChildren: './pages/usuarios/usuarios/usuario.module#UsuarioModule'
      },
      //USUARIOS
      {
        path: 'venta', loadChildren: './pages/reportes/ventas/ventas.module#VentasModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
