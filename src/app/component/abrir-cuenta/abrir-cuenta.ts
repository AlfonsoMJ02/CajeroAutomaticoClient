import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CuentaI } from '../../interface/cuenta';
import { UsuarioS } from '../../service/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abrir-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './abrir-cuenta.html',
  styleUrl: './abrir-cuenta.css',
})
export class AbrirCuenta implements OnInit {
  banco: string = '';

  cuenta: CuentaI = {
    usuario: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      curp: '',
      fechaNacimiento: '',
      email: '',
      password: '',
      telefono: '',
    },
    banco: {
      idBanco: 0,
      nombre: ''
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioS: UsuarioS,
  ) {}

  ngOnInit(): void {
    this.banco = this.route.snapshot.paramMap.get('banco')!;

    this.cuenta.banco.nombre = this.banco;

    if (this.banco == 'BBVA') {
      this.cuenta.banco.idBanco = 1;
    } else if (this.banco == 'Coppel') {
      this.cuenta.banco.idBanco = 2;
    } else if (this.banco == 'Santander') {
      this.cuenta.banco.idBanco = 3;
    } else if (this.banco == 'Banamex') {
      this.cuenta.banco.idBanco = 4;
    }
  }

  regresar() {
    this.router.navigate(['/cajero', this.banco]);
  }

  registrar() {
    this.usuarioS.registrar(this.cuenta).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Cuenta creada exitosamente',
          text: 'Se a enviado un correo electronico con los datos de tu tarjeta',
          confirmButtonText: 'Ir al cajero'
        }).then(() => {
          this.router.navigate(['/cajero', this.banco]);
        })
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.error?.errorMessage || 'Error del servisor'
        })
      },
    });
  }
}
