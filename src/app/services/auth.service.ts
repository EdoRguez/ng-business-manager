import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;

  constructor(public auth: AngularFireAuth,
              private cookieService: CookieService) {
    this.auth.authState.subscribe( state => {
      this.authState = state;
    })
   }

  async login(data: any) {
    return await this.auth.signInWithEmailAndPassword(data.user, data.password);
  }

  async logout() {
    this.authState = null;
    return await this.auth.signOut();
  }

  getUser() {
    return this.auth.authState.pipe(
                                first()
                              ).toPromise();
  }

  isAuthenticated(): boolean {
    return this.authState !== null;
  }

  getCurrentUserId(): string {
    return this.isAuthenticated() ? this.authState.uid : null;
  }

  getUserData(): any {
    if(!this.isAuthenticated()) {
      return [];
    }

    return [
      {
        id: this.authState.uid,
        displayName: this.authState.displayName,
        email: this.authState.email,
        phoneNumber: this.authState.phoneNumber,
        photoURL: this.authState.photoURL
      }
    ]
  }

}
