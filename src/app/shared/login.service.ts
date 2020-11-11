import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    isLoggedIn = false;

    constructor(public afa: AngularFireAuth) {}

    async signin(email: string, password: string) {
        await this.afa.signInWithEmailAndPassword(email,password).then(res => {
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(res.user))
        })
    }

    logout() {
        this.afa.signOut();
        localStorage.removeItem('user');
    }
}