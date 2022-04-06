import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignUp } from '../../models/signup.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  forma: FormGroup;
  usuarioNuevo: SignUp = new SignUp();

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
      
    });
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }
  get bioNoValido() {
    return this.forma.get('bio').invalid && this.forma.get('bio').touched;
  }
  get contrasenaNoValido() {
    return this.forma.get('contrasena').invalid && this.forma.get('contrasena').touched;
  }

  signUp(){
    
    if (this.forma.invalid) {      
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach( control2 => control2.markAsTouched ());
        } else {
          control.markAsTouched();
        }
        
      });

    }

    this.as.nuevoUsuario((this.forma.get("correo").value+'').toLowerCase(), (this.forma.get("contrasena").value+'').toLowerCase()).subscribe(resp => {


      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario creado con éxito.',
        allowOutsideClick: false,
        showConfirmButton: false

      });

      setTimeout(() => {
        Swal.close();
        this.router.navigateByUrl('/login')
      }, 5000);


    }, (err) => {

      let mensajeError: string;
      if (err.error.error.message === 'EMAIL_EXISTS') {
        mensajeError='El correo ya se encuentra registrado. Pruebe con uno distinto.'
      } else {
        mensajeError = err.error.error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error al crear cuenta de usuario.',
        text: mensajeError,
        allowOutsideClick: false

      });
    })





  }

}
