import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioI } from '../interface/usuario';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UsuarioS {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ){}

  registrar(usuario: UsuarioI): Observable<any> {
     return this.http.post<any>(`${this.apiUrl}/Usuario`, usuario);
  }
}

