import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";


export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  objective_meat: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public firestore: AngularFirestore) {}

  updateUserObjectiveMeat(userId, objective_meat) {
    this.firestore.collection("users").doc(userId).set({
      objective_meat: objective_meat
    })
  }
  

}