import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { connection } from '../models/connection';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private _connection = new BehaviorSubject<connection>({ inputId:0, outputId:0 });
  
  currentConnecion =  this._connection.asObservable();

 
  constructor() { }

 
  changeInputId(inputId:number){
    const outputId = this._connection.value.outputId;
    this._connection.next({ inputId: inputId, outputId: outputId  }); 
  }

  changeOutputId(outputId:number){
    const inputId = this._connection.value.inputId;
    this._connection.next({ inputId: inputId, outputId: outputId  });  
  }

  reset(){
    this._connection.next({ inputId:0, outputId:0})
  }
}
