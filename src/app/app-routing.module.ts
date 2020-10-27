import { RecetasComponent } from './recetas/recetas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PerfilPersonaComponent } from './perfil-persona/perfil-persona.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

    
    {
        path:'login', 
        component:LoginComponent
      },

      {
        path:'perfil/:user', 
        component:PerfilPersonaComponent
      },
  
      {
        path:'pedidos', 
        component:PedidosComponent
      },
      {
        path:'recetas', 
        component:RecetasComponent
      },
  
    {
      path:'home', 
      component:HomeComponent
    },
    {
      path:'**', 
      component:HomeComponent
    }
    
    
  
  
  
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  
  
    
   }
  