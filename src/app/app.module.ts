import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './orders/orders.component';
import { environment } from './../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PerfilPersonaComponent } from './perfil-persona/perfil-persona.component';
import { MenuComponent } from './menu/menu.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { RecetasComponent } from './recetas/recetas.component';
import { AuthService } from "./shared/auth.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RecetasService } from './shared/recetas.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrarseComponent,
    FooterComponent,
    PerfilPersonaComponent,
    MenuComponent,
    PedidosComponent,
    RecetasComponent,
    OrdersComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,'V-Box'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, RecetasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
