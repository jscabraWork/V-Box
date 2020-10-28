import { RegistrarseComponent } from './../registrarse/registrarse.component';

import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from "../shared/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog,public authService: AuthService) { }

  ngOnInit(): void {
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrarseComponent, {
      width: '600px',
      height:'680px'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  
  

}
