import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class RecetasService {

  recipesCollection: AngularFirestoreCollection<IRecipe>;
  recipes: Observable<IRecipe[]>;

  constructor(
    public firestore: AngularFirestore
  ) {
    this.recipes = this.firestore.collection('recipe').valueChanges();
  }

  getRecipes() {
    return this.recipes;
  }

}

export interface IRecipe {
  calories?: number;
  imageurl?: string;
  ingredients?: IIngredient[];
  name?: string;
  reting?: number;
  steps?: string[];
  time?: number;
  units?: number;
}

export interface IIngredient {
  amount?: number;
  name?: string;
  reference?: string;
}
