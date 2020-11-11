import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../shared/auth.service";
import { User, UsersService } from "../shared/users.service";

@Component({
  selector: 'app-perfil-persona',
  templateUrl: './perfil-persona.component.html',
  styleUrls: ['./perfil-persona.component.css']
})
export class PerfilPersonaComponent implements OnInit {

  constructor(public authService : AuthService, public userService : UsersService, public router: Router) { }

  user: User;
  isSignedIn = false

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.userService.getUser(this.authService.uid).subscribe(user => {
        this.user = user
      })
    } else {
      this.router.navigate(['home']);

    }
  }
}
