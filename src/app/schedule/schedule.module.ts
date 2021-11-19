import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app.routing.module';

import { ScheduleRouting } from './schedule.routing';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  declarations: [
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleRouting
  ],
  providers: [],
  bootstrap: [ScheduleModule]
})
export class ScheduleModule { }
