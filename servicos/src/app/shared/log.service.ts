import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  consoleLog(message: string){
    console.log(message);
  }
}
