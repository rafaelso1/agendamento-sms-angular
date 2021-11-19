import { Component, OnInit } from '@angular/core';

import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(
      private ScheduleService : ScheduleService
    ) { }

    openSchedule:boolean = false;
    closeSchedule:boolean = true;

  NewSchedule(){
    this.getFormSchedule();
  }

  getFormSchedule(){
    this.closeSchedule = (this.closeSchedule == true) ? false : true;
    this.openSchedule = (this.openSchedule == true) ? false : true;
  }
  
}
