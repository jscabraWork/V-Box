import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRecipe, RecetasService } from '../shared/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})

export class RecetasComponent implements OnInit {

  recipes: IRecipe[];

  constructor(
    private recetasService: RecetasService
  ) { }

  ngOnInit(): void {
    this.logIn();
  }

  async logIn() {
    await this.recetasService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

}
