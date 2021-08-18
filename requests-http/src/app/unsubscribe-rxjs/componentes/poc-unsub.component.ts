import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poc-unsub',
  template: `
  <app-poc-base [nome]="nome"
    [valor]="valor" estilo="bg-secondary">
  </app-poc-base>
`
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  nome = 'Componente com unsubscribe';
  valor!: string;

  sub: Subscription[] = []; // para muitas desinscrições utilizar um array e adicionar o push

  constructor(private service: EnviarValorService) { }

  ngOnInit(): void {
    this.sub.push(this.service.getValor() // para muitas desinscrições utilizar um array e adicionar o push
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(novoValor => this.valor = novoValor));
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
    console.log(`${this.nome} foi destruido.`);
  }

}
