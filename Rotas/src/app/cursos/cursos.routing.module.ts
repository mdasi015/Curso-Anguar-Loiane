import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ModuleWithProviders } from '@angular/core';

import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosComponent } from "./cursos.component";
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';


const cursosRoutes: Routes = [
  { path: '', component: CursosComponent},
  { path: 'naoEncontrado', component: CursoNaoEncontradoComponent},
  { path: ':id', component: CursoDetalheComponent}
];

//export const routing: ModuleWithProviders<any> = RouterModule.forRoot(cursosRoutes);

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
