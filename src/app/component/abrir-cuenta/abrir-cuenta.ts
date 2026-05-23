import { assertInInjectionContext, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioI } from '../../interface/usuario';
import { UsuarioS } from '../../service/usuario';

@Component({
  selector: 'app-abrir-cuenta',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './abrir-cuenta.html',
  styleUrl: './abrir-cuenta.css'
})
export class AbrirCuenta implements OnInit {

  banco: string = '';

  usuario: UsuarioI = {

    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    curp: '',
    fechaNacimiento: '',
    email: '',
    password: '',
    telefono: '',

    banco: {
      idBanco: 0
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioS: UsuarioS
  ){}

  ngOnInit(): void {

    this.banco = this.route.snapshot.paramMap.get('banco')!;

    if(this.banco == 'BBVA'){
      this.usuario.banco.idBanco = 1;
    } else if (this.banco == 'Coppel'){
      this.usuario.banco.idBanco = 2;
    } else if (this.banco == 'Banamex'){
      this.usuario.banco.idBanco = 3;
    } else if (this.banco == 'Santander'){
      this.usuario.banco.idBanco = 4;
    }

  }

  regresar(){

    this.router.navigate(['/cajero', this.banco]);

  }

  registrar(){
    console.log(this.usuario);
    this.usuarioS.registrar(this.usuario).subscribe({
      next: (response) => {
        alert('Usuario registrado correctamente');

        this.router.navigate(['/cajero', this.banco]);
      },
      error: (error) => {
        alert(error.error.errorMessage)
      }
    });
  }
}
