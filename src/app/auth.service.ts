import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private credentials: any = null;

  constructor(private router: Router, private http: Http) { }

  login(credentials: any) {
    this.http.post('https://my-app.com/api/authenticate', credentials)
      .map(res => res.json())
      .subscribe(
      // We're assuming the response will be an object
      // with the JWT on an id_token key
      data => localStorage.setItem('id_token', data.id_token),
      error => console.log(error)
      );
  }

  logout(): void {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/dashboard');
  }

  get loggedIn(): boolean { return localStorage.getItem('id_token') != null; }
}
