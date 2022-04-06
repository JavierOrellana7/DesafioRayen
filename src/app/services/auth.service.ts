import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDSv7QlQCf3BdleupCIziATFU-jf_QqpTw';

  userToken: string;

  constructor(private http: HttpClient) { }

  logIn(email: string, contrasena: string) {
    const authdata = {
      email: email,
      password: contrasena,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`, authdata)
    .pipe(map(resp => {

      this.guardarToken(resp['idToken']);
      return resp;
    }));
  }

  guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  nuevoUsuario(email: string, password: string) {
    
    const authdata = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}signUp?key=${this.apikey}`, authdata)
    .pipe(map(resp => {
      
      return resp;
    }));
    
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {      
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
    
  }

  
}
