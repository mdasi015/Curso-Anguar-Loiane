import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificarEmailService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string) {
    return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        delay(2000),
        map((dados: any) => dados.emails),
        tap(console.log),
        map((dados: { email: string; }[]) => dados.filter((v: { email: string; }) => v.email === email)),
        //tap(console.log),
        map((dados: any[]) => dados.length > 0 )
        //tap(console.log)
      );

  }
}
