import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
@Component({
  selector: 'app-perfil-persona',
  templateUrl: './perfil-persona.component.html',
  styleUrls: ['./perfil-persona.component.css']
})
export class PerfilPersonaComponent implements OnInit {

  constructor(public authService : AuthService) { }
  usuario;
  ngOnInit(): void {
  }

}
