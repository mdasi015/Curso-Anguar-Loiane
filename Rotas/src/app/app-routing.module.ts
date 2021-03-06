import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { ModuleWithProviders } from '@angular/core';
//import { CursosComponent } from "./cursos/cursos.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { CursosGuard } from './guards/cursos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { AlunosGuard } from './guards/alunos.guard';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';


const routes: Routes = [
  {path: 'cursos', 
  loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule), 
  canActivate: [AuthGuard],
  canActivateChild: [CursosGuard],
  canLoad: [AuthGuard]},

  {path: 'alunos', 
  loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule), 
  canActivate: [AuthGuard],
  canLoad: [AuthGuard]
},
  //canActivateChild: [AlunosGuard]},

  //{ path: 'cursos', component: CursosComponent},
  //{ path: 'cursos/:id', component: CursoDetalheComponent},
  //{ path: 'naoEncontrado', component: CursoNaoEncontradoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: '**', component: PaginaNaoEncontradaComponent} //canActivate: [AuthGuard]} - para ir para página de login 
];

//export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
