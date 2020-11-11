import { Injectable, NgZone } from '@angular/core';
import { User, UsersService } from "./users.service";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  uid:string;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public usersService: UsersService
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.uid=user.uid;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['perfil/user']);
        });
        this.uid=result.user.uid;
        this.setUserData(this.uid)
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password, objective_meat) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        let user = this.userCredentialToUserClass(result.user, objective_meat)
        this.SetUserData(user);
        this.ngZone.run(() => {
          this.router.navigate(['perfil/user']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  //GoogleAuth() {
  //  return this.AuthLogin(new auth.GoogleAuthProvider());
  //}

  // Auth logic to run auth providers
  //AuthLogin(provider) {
  //  return this.afAuth.signInWithPopup(provider)
  //  .then((result) => {
  //     this.ngZone.run(() => {
  //        this.router.navigate(['dashboard']);
  //      })
  //    this.SetUserData(result.user);
  //  }).catch((error) => {
  //    window.alert(error)
  //  })
  //}

  /* Convierte las credenciales de un usuario de la parte de autenticación en unas normales
  */
  userCredentialToUserClass(user, objective_meat) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      objective_meat: objective_meat
    }
    return userData
  }

  /* Returns user data by id
  */
  setUserData(uid){
    this.userData = this.afs.doc(`users/${uid}`);
    return this.userData;
  }

  getUserData(){
    return this.userData;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    })
  }

}