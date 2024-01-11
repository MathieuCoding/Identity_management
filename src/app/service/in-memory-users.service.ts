import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {UserLdap} from "../models/user-ldap";
import {LDAP_USERS} from "../models/ldap-mock-data";

@Injectable({
  providedIn: 'root'
})
export class InMemoryUsersService implements InMemoryDbService {
  createDb() {
    console.log('InMemoryUsersService.createDb');
    const users: UserLdap[] = LDAP_USERS;
    return {users};
  }
  // constructor() { }
  getId(users: UserLdap[]): number {
    console.log('InMemoryUsersService.getId');
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 4;
  }
}
