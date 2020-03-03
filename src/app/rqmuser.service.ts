/*
openrqm-client-desktop-nwjs
RQMUser Service
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

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
