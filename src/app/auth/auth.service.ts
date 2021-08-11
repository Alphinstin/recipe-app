import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './store/auth.actions';

const FIREBASE_SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`;
const FIREBASE_SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  autoLogoutHandler: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDate: number) {
    this.autoLogoutHandler = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDate);
  }

  clearLogoutTimer() {
    if (this.autoLogoutHandler) {
      clearTimeout(this.autoLogoutHandler);
    }
  }
}
