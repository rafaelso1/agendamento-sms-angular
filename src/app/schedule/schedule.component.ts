import { Component, OnInit } from '@angular/core';

import { scheduleService } from './schedule.service';

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
      private scheduleService : scheduleService
    ) { }

  listSchedule:boolean = true;
  openSchedule:boolean = false;
  allSchedule:any = [];
  firstSchedule:any = null;

  newSchedule(){
    this.getFormSchedule();
    this.firstSchedule ={
      id: null,
      hour_min: null,
      message: "",
      activate: null,
      users: []
    }
  }

  getFormSchedule(){
    this.listSchedule = (this.listSchedule == true) ? false : true;
    this.openSchedule = (this.openSchedule == true) ? false : true;
  }
  
  confirm(){
    this.scheduleService.update(this.firstSchedule)
      .subscribe(res =>{
        this.getFormSchedule();
        this.getAll();
      })
  }

  disabledBtn(){
    if (
        (this.firstSchedule.hour_min == null || this.firstSchedule.hour_min == "") ||
        (this.firstSchedule.message == null || this.firstSchedule.message == "") ||
        (this.firstSchedule.activate == null || this.firstSchedule.activate == "") ||
        (this.firstSchedule.users.length == 0)
      ) {
      return true;
    }
    else {
      return false;
    }
  }

  editOne(obj: any){
    this.scheduleService.post(obj)
      .subscribe(res => {
        this.firstSchedule = res.data;
        this.getFormSchedule
      })
  }

  getAll(){
    this.scheduleService.get()
      .subscribe((res) => this.scheduleService = res.data);
  }

  cancel(){
    this.getAll();
    this.getFormSchedule();
  }

}
