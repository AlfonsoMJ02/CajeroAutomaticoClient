import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { BancoS } from '../../service/banco';
import { BancoI } from '../../interface/banco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  bancos: BancoI[] = [];

  constructor(
    private router: Router,
    private bancoService: BancoS,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.obtenerBancos();
  }

  obtenerClaseBanco(nombreBanco: string): string {
    switch (nombreBanco.toLowerCase()) {
      case 'bbva':
        return 'bbva';

      case 'coppel':
        return 'coppel';

      case 'banamex':
        return 'banamex';

      case 'santander':
        return 'santander';

      default:
        return 'default-bank';
    }
  }

  obtenerBancos() {
    this.bancoService.getAll().subscribe({
      next: (response) => {

        this.bancos = response.objects;

        this.cdr.detectChanges();

      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  irCajero(nombreBanco: string) {
    this.router.navigate(['/cajero', nombreBanco]);
  }
}
