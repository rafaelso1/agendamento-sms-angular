import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import * as g from '../global';

@Injectable({
  providedIn: 'root'
})
export class scheduleService {

  constructor(
    private http: HttpClient
  ) { }

  post(obj:any){
    return this.http.post(g.url+'schedule/post', obj)
      .pipe(map((response: any) => response.json()));
  }

  get(){
    return this.http.get(g.url+'schedule/get')
      .pipe(map((response: any) => response.json()));
  }

  update(obj:any){
    return this.http.put(g.url+'schedule/update',obj)
      .pipe(map((response: any) => response.json()));
  }

  delete(obj:any){
    return this.http.delete(g.url+'schedule/delete',obj)
      .pipe(map((response: any) => response.json()));
  }

  read(file: any){
    return new Promise((resolve,reject) => {
      this.readFile(file)
        .then((res: any) => resolve(res))
        .catch((err: any) => reject(err));
    });
  }

  readFile(file: File){
    return new Promise((resolve, reject) => {
      
      let reader = new FileReader();
      reader.onload = () => {

        let result: any = reader.result;
        let rows = result.split("\n");

        let datas = [];
        let row = '';

        for( let i = 0; i < rows.length; i++ ){
          if( rows[i] != "" ){
            row = '';
            row = rows[i].split(';');

            datas.push({
              'tel': row[0],
              'name': row[1],
            });

          }
        }
        
        resolve(datas);
        reject('Por favor, verifique o arquivo atual');
      };
      reader.readAsText(file);
    })
  }

}
function err(err: any): import("rxjs").OperatorFunction<Promise<any>, any> {
  throw new Error('Function not implemented.');
}

