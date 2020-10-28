import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";


export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}