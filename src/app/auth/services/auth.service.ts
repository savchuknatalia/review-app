import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  userDataInput,
  userDataOutput,
} from 'src/app/auth/interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl: string = 'http://smktesting.herokuapp.com/api';
  public userName: string;

  constructor(private http: HttpClient, private router: Router) {}

  public signUpUser(userData: userDataInput): Observable<userDataOutput> {
    return this.http.post<userDataOutput>(
      `${this.baseUrl}/register/`,
      userData
    );
  }

  public signInUser(userData: userDataInput): any {
    return this.http.post<userDataOutput>(`${this.baseUrl}/login/`, userData);
  }

  public isAuth(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else return false;
  }

  public signOut(): void {
    this.userName = '';
    localStorage.removeItem('token');
  }
}
