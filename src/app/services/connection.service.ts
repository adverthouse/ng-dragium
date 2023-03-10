import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private _isDragging = new BehaviorSubject<boolean>(false);
  private _inputId = new BehaviorSubject<number>(0);
  private _outputId =  new BehaviorSubject<number>(0);

  currentIsDragging = this._isDragging.asObservable();
  currentInputId = this._inputId.asObservable();
  currentOutputId = this._outputId.asObservable();

  constructor() { }

  changeIsDragging(isDragging:boolean){
    this._isDragging.next(isDragging);
  }

  changeInputId(inputId:number){
    this._inputId.next(inputId);
  }

  changeOutputId(outputId:number){
    this._outputId.next(outputId);
  }
}
