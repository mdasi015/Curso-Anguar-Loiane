import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from './../models/estado-br.model';
import { Cidade } from '../models/cidades';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json')
  }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    )
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev JR'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev SR'}
    ];
  }

  getTecnologias(){
    return [
      {nome: 'Java', Desc: 'Java'},
      {nome: 'JavaScript', Desc: 'JavaScript'},
      {nome: 'PHP', Desc: 'PHP'},
      {nome: 'Ruby', Desc: 'Ruby'}
    ];
  }

  getNewsletter(){
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Nao'}
    ];
  }
}
