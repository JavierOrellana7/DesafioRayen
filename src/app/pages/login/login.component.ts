import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUp } from '../../models/signup.model';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  forma: FormGroup;
  

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.crearFormulario();

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.as.userToken = '';

    }
  }

  crearFormulario(){
    this.forma = this.fb.group({      
      usuario: ['', [Validators.required, Validators.email]],      
      contrasena: ['', [Validators.required]]      
    });
  }

  
  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get contrasenaNoValido() {
    return this.forma.get('contrasena').invalid && this.forma.get('contrasena').touched;
  }

  logIn(){
    
    let mensajeError;

    if (this.forma.invalid) {      
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach( control2 => control2.markAsTouched ());
        } else {
          control.markAsTouched();
        }
        
      });

    }

    Swal.fire({
      allowOutsideClick: false,      
      text: 'Espere porfavor'

    });
    Swal.showLoading();
    
    this.as.logIn((this.forma.get("usuario").value+'').toLowerCase(), (this.forma.get("contrasena").value+'').toLowerCase()).subscribe(resp => {
      
      Swal.close();
      this.router.navigateByUrl('/explore')


    }, (err) => {      

      if (err.error.error.message === 'EMAIL_NOT_FOUND' || err.error.error.message === 'INVALID_PASSWORD' || err.error.error.message === 'INVALID_EMAIL') {
        mensajeError = 'El email o la contraseña son inválidos'.toUpperCase();
      } else {
        mensajeError = err.error.error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: mensajeError

      });

    }); 


  }



}
