import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './cajero.html',
  styleUrl: './cajero.css',
})
export class Cajero implements OnInit{

  banco: string = '';
  numeroTarjeta: string = '';
  nip: string = '';
  sesionIniciada: boolean = false;

  vistaRetiro: boolean = false;
  vistaSaldo: boolean = false;
  cantidadRetiro: number = 0;
  usuarioLogueado: any;
  denominacionesRetiro:any[] = [];

  billetes = [
    {tipo: 'Billete', cantidad: 2, denominacion: 1000},
    {tipo: 'Billete', cantidad: 5, denominacion: 500},
    {tipo: 'Billete', cantidad: 10, denominacion: 200},
    {tipo: 'Billete', cantidad: 20, denominacion: 100},
    {tipo: 'Billete', cantidad: 30, denominacion: 50},
    {tipo: 'Billete', cantidad: 40, denominacion: 20}
  ];

  monedas = [
    {tipo: 'Moneda', cantidad: 50, denominacion: 10},
    {tipo: 'Moneda', cantidad: 100, denominacion: 5},
    {tipo: 'Moneda', cantidad: 200, denominacion: 2},
    {tipo: 'Moneda', cantidad: 300, denominacion: 1},
    {tipo: 'Moneda', cantidad: 100, denominacion: 0.5}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.banco = this.route.snapshot.paramMap.get('banco')!;
  }

  ingresar(){
    const loginData = {
      numeroTarjeta: this.numeroTarjeta,
      nip: Number(this.nip),
      banco: this.banco
    }
    this.auth.login(loginData).subscribe({
      next: (response) => {
        this.usuarioLogueado = response.object;
        this.sesionIniciada = true;
        Swal.fire({
          title: 'Ingresando a la cuenta',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false 
        });
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.sesionIniciada = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.errorMessage
        });
      }
    })
  }

  abrirRetiro(){
    this.vistaRetiro = true;
  }

  regresarMenu(){
    this.vistaRetiro = false;
    this.vistaSaldo = false;
  }

  verSaldo(){
    this.vistaSaldo = true;
  }

  abrirCuenta(){
    this.router.navigate(['/abrir-cuenta', this.banco]);
  }

  retirar(){
  if(this.cantidadRetiro <= 0){

    Swal.fire({
      icon:'warning',
      title:'Cantidad inválida',
      text:'Ingresa una cantidad válida'
    });

    return;
  }

  this.auth.retirar(this.cantidadRetiro).subscribe({

    next:(response) => {

      Swal.fire({
        icon:'success',
        title:'Retiro exitoso',
        text:'El retiro se realizó correctamente'
      });
      this.cdr.detectChanges();
      this.denominacionesRetiro = response.object;

      this.usuarioLogueado.cuenta.saldo -= this.cantidadRetiro;

      this.cantidadRetiro = 0;
    },
    error:(error) => {
      console.log(error);
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text:error?.error?.errorMessage || "Error del servidor"
      });
    }
  });
}

  cerrarSesion(){
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Tu sesión actual se cerrará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sesionIniciada = false;
        this.router.navigate(['/']);
      }
    });
  }
}
