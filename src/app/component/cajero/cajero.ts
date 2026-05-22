import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.banco = this.route.snapshot.paramMap.get('banco')!;
  }

  ingresar(){
    if(this.numeroTarjeta != '' && this.nip != ''){
      this.sesionIniciada = true;
    }
  }

  abrirRetiro(){
    this.vistaRetiro = true;
  }

  regresarMenu(){
    this.vistaRetiro = false;
  }

  retirar(){
    console.log(this.cantidadRetiro);
  }
}
