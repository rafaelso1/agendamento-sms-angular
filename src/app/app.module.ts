import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import SmsScheduler from './app.component';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { ScheduleComponent } from './schedule/schedule.component';
import { MockXHRBackend } from './mock-xhr-backend';

@NgModule({
  declarations: [
    SmsScheduler,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HttpXhrBackend, useClass: MockXHRBackend },
    MockXHRBackend,
  ],
  bootstrap: [SmsScheduler]
})
export class AppModule { }
