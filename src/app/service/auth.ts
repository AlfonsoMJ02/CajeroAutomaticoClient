import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ){}

  login(data: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/Login`, data,
      {
        withCredentials: true
      }
    );
  } 

  retirar(monto:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Cajero/Retirar/${monto}`, 
      {},
    {
      withCredentials: true
    })
  }
}
