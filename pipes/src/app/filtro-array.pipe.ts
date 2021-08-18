import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'
})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value.length === 0 || args === undefined) {
      return value;
    }
    
    const filter = args.toLocaleString().toLocaleLowerCase();
    return value.filter(
      v => v.toLocaleLowerCase().includes(filter) // Se o valor que to passando como filtro não existir dentro do meu array então ele é filtrado
    );
  }

}
