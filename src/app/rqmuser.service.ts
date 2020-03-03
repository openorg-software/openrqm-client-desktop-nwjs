import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RQMUserService {

  id: number = -1;
  token: string = "";

  constructor() { }

  public setId(id: number) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }
}
