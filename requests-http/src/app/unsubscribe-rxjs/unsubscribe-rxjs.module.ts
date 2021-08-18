import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocAsyncComponent } from './componentes/poc-async.component';
import { PocTakeUntilComponent } from './componentes/poc-take-until.component';
import { PocTakeComponent } from './componentes/poc-take.component';
import { PocUnsubComponent } from './componentes/poc-unsub.component';
import { PocComponent } from './componentes/poc.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PocBaseComponent,
    UnsubscribePocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent,
    PocComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule,
    FormsModule
  ]
})
export class UnsubscribeRxjsModule { }
