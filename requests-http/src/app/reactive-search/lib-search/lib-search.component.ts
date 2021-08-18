import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()), // mapear e remover todos os espacos
      filter(value => value.length > 1), //filtrar apenas valores no campo de pesquisa maior que 1
      debounceTime(200), // demora alguns seguros para buscar na pesquisa
      distinctUntilChanged(), // me de todos os valores distintos ate que ele seja modificado
      //tap(value => console.log(value)),
      switchMap(value => this.http.get(this.SEARCH_URL, { // cancela requisicoes anteriores
        params: {
          search: value,
          fields: this.FIELDS
        }
      })),
      tap((res: any) => this.total = res.total), // pega o total de registros que foram recebidos e atribui do HTML
      map((res: any) => res.result) // pega do json somente os resultados que estamos interessados
    );
  }

  onSearch(){
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;
    if (value && (value.trim()) == ''){

      const params_ = {
        search: value,
        fields: fields
      };

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

    this.results$ = this.http.get(this.SEARCH_URL, { params } )
    .pipe(
      tap((res: any) => this.total = res.total),
      map((res: any) => res.result)
    );
    }
  }

}
