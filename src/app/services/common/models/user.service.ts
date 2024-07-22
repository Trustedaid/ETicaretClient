import { Injectable } from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {User} from "../../../entities/user";
import {Create_User} from "../../../contracts/users/create_user";
import {firstValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User) : Promise<Create_User> {
    const observable : Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as Create_User;

  }
  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void) {
    const observable = this.httpClientService.post({
      controller: "users",
      action: "login"
    }, {
      userNameOrEmail,
      password
    });
    await firstValueFrom(observable);
    callBackFunction();
  }
}