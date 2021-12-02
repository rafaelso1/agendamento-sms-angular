import { Component, OnInit } from '@angular/core';

import { scheduleService } from './schedule.service';
import * as mockXhrBackend from '../mock-xhr-backend';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
styleUrls: ['./schedule.component.css', './bootstrap.min.css']
})

export class ScheduleComponent{
  constructor(
      private scheduleService : scheduleService,
      private MockXHRBackend : mockXhrBackend.MockXHRBackend
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
      users: [ {
        id: 1,
        name: "Junior da Silva Almeia",
        tel: "11999999999"
    },
    {
        id: 2,
        name: "Rafael Soares da Silva",
        tel: "11988888888"
    } ],
    }
  }

  getFormSchedule(){
    this.listSchedule = (this.listSchedule == true) ? false : true;
    this.openSchedule = (this.openSchedule == true) ? false : true;
  }

  fileIncluded(e: any) {
    
    let file = e.target.files[0]; 
    
    this.scheduleService.read(file)
      .then(result => this.firstSchedule.pessoas = result);
  }

  deleteBind(a: any,p: any){
    this.scheduleService.delete({ id_agendamento : a, telefone : p })
      .subscribe(res => {

        let array: any[] = [];

        this.firstSchedule.pessoas.forEach((i: { telefone: any; }) => {
          if(i.telefone != p){
            array.push(i);
          }
        });
        
        this.firstSchedule.pessoas = array;

      });
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
        (this.firstSchedule.name == null || this.firstSchedule.name == "")
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

  getAll(){
    this.scheduleService.get()
      .subscribe((res) => this.scheduleService = res.data);
  }

  cancel(){
    this.getAll();
    this.getFormSchedule();
  }

}
