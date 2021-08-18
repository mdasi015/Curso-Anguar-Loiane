import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { TemplateFormComponent } from './template-form/template-form.component';
//import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormModule } from './template-form/template-form.module';
import { DataFormModule } from './data-form/data-form.module';
//import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
//import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  declarations: [
    AppComponent,
    //TemplateFormComponent,
    //DataFormComponent
    //CampoControlErroComponent
    //FormDebugComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TemplateFormModule,
    ReactiveFormsModule,
    DataFormModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
