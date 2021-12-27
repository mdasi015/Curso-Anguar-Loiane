import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiretivaNgifComponent } from './diretiva-ngif/diretiva-ngif.component';
import { DiretivaNgswitchComponent } from './diretiva-ngif/diretiva-ngswitch/diretiva-ngswitch.component';
import { DiretivaNgforComponent } from './diretiva-ngif/diretiva-ngfor/diretiva-ngfor.component';
import { DiretivaNgclassComponent } from './diretiva-ngif/diretiva-ngclass/diretiva-ngclass.component';
import { DiretivaNgstyleComponent } from './diretiva-ngif/diretiva-ngstyle/diretiva-ngstyle.component';
import { OperadorElvisComponent } from './diretiva-ngif/operador-elvis/operador-elvis.component';
import { ExemploNgContentComponent } from './diretiva-ngif/exemplo-ng-content/exemplo-ng-content.component';
import { FundoAmareloDirective } from './diretiva-ngif/shared/fundo-amarelo.directive';
import { DiretivasCustomizadasComponent } from './diretiva-ngif/diretivas-customizadas/diretivas-customizadas.component';
import { HighlightMouseDirective } from './diretiva-ngif/shared/highlight-mouse.directive';
import { HighlightDirective } from './diretiva-ngif/shared/highlight.directive';
import { NgElseDirective } from './diretiva-ngif/shared/ng-else.directive';

@NgModule({
  declarations: [
    AppComponent,
    DiretivaNgifComponent,
    DiretivaNgswitchComponent,
    DiretivaNgforComponent,
    DiretivaNgclassComponent,
    DiretivaNgstyleComponent,
    OperadorElvisComponent,
    ExemploNgContentComponent,
    FundoAmareloDirective,
    DiretivasCustomizadasComponent,
    HighlightMouseDirective,
    HighlightDirective,
    NgElseDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
