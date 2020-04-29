import { Injectable } from '@angular/core';
import { userLogin } from '../data/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  public signIn(userData){
    if(userData.username === userLogin.username && userData.password === userLogin.password){
      const randomString=Math.random().toString(36);
      localStorage.setItem('ACCESS_TOKEN', randomString);
      localStorage.setItem('USERNAME', userLogin.username);
      return true;
    }

    return false;
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USERNAME');
  }
}
