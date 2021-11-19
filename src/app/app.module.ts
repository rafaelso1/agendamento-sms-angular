import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { SmsScheduler } from './app.component';

@NgModule({
  declarations: [
    SmsScheduler
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [SmsScheduler]
})
export class AppModule { }
