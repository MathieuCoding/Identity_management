import { Injectable } from '@angular/core';
import {LDAP_USERS} from "../models/ldap-mock-data";
import {UserLdap} from "../models/user-ldap";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Liste des utilisateurs
  users: UserLdap[] = LDAP_USERS;

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }
  constructor() { }
}
