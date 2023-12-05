import { Injectable } from '@angular/core';
import {LDAP_USERS} from "../models/ldap-mock-data";
import {UserLdap} from "../models/user-ldap";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Liste des utilisateurs
  users: UserLdap[] = LDAP_USERS;

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }

  getUser(login: string): Observable<UserLdap> {
    const user = this.users.find(user => user.login === login);
    if (user !== undefined)
      return of(user);

    return throwError(() => new Error('Utilisateur non trouvé'));
  }

  constructor() {
  }
}
