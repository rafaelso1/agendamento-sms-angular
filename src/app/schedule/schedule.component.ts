import { Component, OnInit } from '@angular/core';

import { scheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
styleUrls: ['./schedule.component.css', './bootstrap.min.css']
})

export class ScheduleComponent{
  constructor(
      private scheduleService : scheduleService,
    ) { }

  listSchedule:boolean = true;
  openSchedule:boolean = false;
  allSchedule:any = [];
  firstSchedule:any = null;
  activateList:any = [
    {id: 0, text: "NÃO"},
    {id: 1, text: "SIM"},
  ];

  newSchedule(){
    this.getFormSchedule();
    this.firstSchedule ={
      id: null,
      hour_min: null,
      message: "",
      activate: null,
      users: [ ],
    }
  }

  getFormSchedule(){
    this.listSchedule = (this.listSchedule == true) ? false : true;
    this.openSchedule = (this.openSchedule == true) ? false : true;
  }

  fileIncluded(e: any) {
    
    let file = e.target.files[0]; 
    
    this.scheduleService.read(file)
      .then(result => this.firstSchedule.users = result);
  }

  deleteBind(a: any,p: any){
    this.scheduleService.delete({ id_agendamento : a, telefone : p })
      .subscribe(res => {

        let array: any[] = [];

        this.firstSchedule.users.forEach((i: { telefone: any; }) => {
          if(i.telefone != p){
            array.push(i);
          }
        });
        
        this.firstSchedule.users = array;

      });
  }
  
  
  disabledBtn(){
    if (
      (this.firstSchedule.hour_min == null || this.firstSchedule.hour_min == "") ||
        (this.firstSchedule.message == null || this.firstSchedule.message == "") ||
        (this.firstSchedule.activate == null || this.firstSchedule.activate == "")
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
        this.getFormSchedule();
      })
    }

  getOne(obj:any){
    this.scheduleService.post(obj)
      .subscribe(res => {
        this.firstSchedule = res.data;
        this.getFormSchedule();
      });
  }

  getAll(){
    this.scheduleService.get()
      .subscribe((res) => this.allSchedule = res.data);
    }
    
    confirm(){
      this.scheduleService.update(this.firstSchedule)
        .subscribe(res =>{
          this.getFormSchedule();
          this.getAll();
        });
    }

    cancel(){
    this.getAll();
    this.getFormSchedule();
  }

}
