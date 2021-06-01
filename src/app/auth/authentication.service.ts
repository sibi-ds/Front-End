import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  users = [{email: "sibi@gmail.com", password: "sibi"}];

  isUserExist(email: string, password: string) {
    return this.users.some((user) => (user.email === email && user.password === password));
  }
}