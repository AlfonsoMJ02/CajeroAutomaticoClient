import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';

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
  cantidadRetiro: number = 0;

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
    private auth: Auth
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
        console.log(response);

        this.sesionIniciada = true;
      },
      error: (error) => {
        console.log(error);

        alert(error.error.errorMessage);
        this.sesionIniciada = false;
      }
    })
  }

  abrirRetiro(){
    this.vistaRetiro = true;
  }

  regresarMenu(){
    this.vistaRetiro = false;
  }

  abrirCuenta(){
    this.router.navigate(['/abrir-cuenta', this.banco]);
  }

  retirar(){
    console.log(this.cantidadRetiro);
  }
}
